from django.contrib.auth import get_user_model
from django.core.validators import (
    MinLengthValidator,
    MinValueValidator,
    validate_slug,
)
from django.db import models
from django.db.models.functions import Lower
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from slugify import slugify

from colorfield.fields import ColorField
from core.validators import (
    validate_color_hex_code,
    validate_letter_or_blank_space,
    validate_only_letters,
)

User = get_user_model()


def image_directory_path(instance, filename):
    return f"{instance.image_directory}/{filename}"


class BaseDirectoryModel(models.Model):
    """Базовая модель справочников."""

    name = models.CharField(
        _("name"),
        max_length=25,
        validators=[validate_letter_or_blank_space, MinLengthValidator(2)],
    )
    priority = models.IntegerField(_("priority"), default=1000)
    description = models.TextField(
        _("description"), max_length=100, blank=True
    )

    class Meta:
        abstract = True
        ordering = ["priority", "name"]
        constraints = [
            models.UniqueConstraint(
                Lower("name"),
                name="%(class)s_name_unique",
                violation_error_message=(
                    "Наименование должно быть уникальным!"
                ),
            ),
        ]


class SlugMixin(models.Model):
    """Модель микшена для slug справочников."""

    slug = models.SlugField(
        _("slug"),
        unique=True,
        max_length=50,
        validators=[validate_slug],
        help_text=_("Required. Enter slug, please."),
        error_messages={
            "unique": _("A with that slug already exists."),
        },
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    class Meta:
        abstract = True


class IconMixin(models.Model):
    """Модель микшена для иконок."""

    image_directory = "icon"
    image = models.ImageField(_("image"), upload_to=image_directory_path)

    class Meta:
        abstract = True


class Icon(IconMixin, models.Model):
    """Модель иконок."""

    image_directory = "category"
    tag = models.CharField(
        _("tag"),
        max_length=25,
        validators=[validate_letter_or_blank_space, MinLengthValidator(2)],
    )

    class Meta:
        verbose_name = _("Icon")
        verbose_name_plural = _("Icons")

    def __str__(self):
        """Метод возвращает информацию по иконке."""
        return self.image


class Finance(BaseDirectoryModel, IconMixin, SlugMixin):
    """Модель справочника для источника дохода/списания(счет)."""

    image_directory = "finance"

    class Meta:
        verbose_name = _("Finance")
        verbose_name_plural = _("Finances")

    def __str__(self):
        """Метод возвращает информацию по источнику финансирования."""
        return self.name


class Category(BaseDirectoryModel):
    """Модель cправочника для категорий."""

    image = models.ForeignKey(
        Icon,
        on_delete=models.SET_NULL,
        related_name="categories",
        verbose_name=_("icon"),
    )

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def __str__(self):
        """Метод возвращает информацию по категории."""
        return self.name


class Budget(models.Model):
    """Модель бюджета пользователя."""

    name = models.CharField(
        _("name"),
        max_length=200,
        default=_("budget"),
        help_text=_("Required. Enter name budget, please."),
    )
    pub_date = models.DateTimeField(
        _("public date"), default=timezone.now, db_index=True
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="budgets",
        verbose_name=_("user"),
    )
    description = models.TextField(
        _("description"),
        blank=True,
    )

    class Meta:
        verbose_name = _("Budget")
        verbose_name_plural = _("Budgets")

    def __str__(self):
        """Возвращает информацию по бюджету пользователя."""
        return f"Бюджет {self.name} пользователя {self.user}"


class IncomeExpenses(models.IntegerChoices):
    """Модель выбора дохода/расхода."""

    INCOME = 0, _("Income")
    EXPENSES = 1, _("Expenses")
    __empty__ = _("(Unknown)")


class BudgetCategory(Category):
    """Модель категорий дохода/расхода для бюджета."""

    budget = models.ForeignKey(
        Budget,
        verbose_name=_("budget"),
        on_delete=models.CASCADE,
        related_name="categories",
    )
    type_category = models.IntegerField(
        verbose_name=_("type"),
        choices=IncomeExpenses.choices,
    )
    color = ColorField(
        _("color HEX-code"),
        max_length=7,
        blank=True,
        validators=[validate_color_hex_code],
        help_text=_("Not required. Enter HEX-code color, please."),
    )

    class Meta:
        """Метаданные модели категорий бюджета."""

        constraints = [
            models.UniqueConstraint(
                Lower("name"),
                "budget",
                "type_category",
                name="unique_name_budget_type_category",
                violation_error_message=(
                    "Наименование категории для бюджета "
                    "должно быть уникальным!"
                ),
            )
        ]
        verbose_name = _("Budget category")
        verbose_name_plural = _("Budget categories")

    def __str__(self):
        """Метод возвращает информацию по категориям бюджета."""
        return f"{self.category} (тип {self.income_expenses})"


class BudgetFinance(models.Model):
    """Модель источников финансирования дохода/расхода для бюджета."""

    budget = models.ForeignKey(
        Budget,
        verbose_name=_("budget"),
        on_delete=models.CASCADE,
        related_name="finances",
    )
    finance = models.ForeignKey(
        Finance,
        verbose_name=_("finance"),
        on_delete=models.CASCADE,
        related_name="finances",
    )
    balance = models.DecimalField(
        verbose_name=_("balance"),
        max_digits=15,
        decimal_places=0,
        default=0,
        validators=[
            MinValueValidator(0, message=_("Minimum value for balance is 0"))
        ],
    )

    class Meta:
        """Метаданные модели категорий финансирования бюджета."""

        constraints = [
            models.UniqueConstraint(
                fields=["budget", "finance"],
                name="unique_budget_finance",
            )
        ]
        verbose_name = _("Budget finance")
        verbose_name_plural = _("Budget finances")

    def __str__(self):
        """Метод возвращает информацию по источникам финансирования."""
        return f"{self.budget} ({self.finance} баланс {self.balance})"


class FinanceTransaction(models.Model):
    """Базовый класс финансовой транзакции."""

    name = models.CharField(
        _("name"),
        max_length=15,
        validators=[validate_only_letters, MinLengthValidator(2)],
    )
    created = models.DateTimeField(_("created"))
    amount = models.DecimalField(
        verbose_name=_("amount"),
        max_digits=15,
        decimal_places=0,
        validators=[
            MinValueValidator(
                0, message=_("Minimum value for transaction is 0")
            )
        ],
    )
    budget = models.ForeignKey(
        Budget,
        verbose_name=_("budget"),
        on_delete=models.CASCADE,
    )
    finance = models.ForeignKey(
        BudgetFinance,
        on_delete=models.SET_NULL,
        verbose_name=_("finance"),
        null=True,
    )
    category = models.ForeignKey(
        BudgetCategory,
        on_delete=models.SET_NULL,
        verbose_name=_("category"),
        null=True,
    )
    description = models.TextField(
        _("description"),
        max_length=100,
        blank=True,
    )

    class Meta:
        ordering = ["-created"]
        default_related_name = "transactions"
        verbose_name = _("Transaction")
        verbose_name_plural = _("Transactions")


class Spend(models.Model):
    """Модель расходов."""

    title = models.CharField("Наименование расхода", max_length=70)
    description = models.TextField(
        "Комментарий к расходу", max_length=500, blank=True, null=True
    )

    class Meta:
        default_related_name = "spends"
        verbose_name = "Расход средств"
        verbose_name_plural = "Расходы средств"

    def __str__(self):
        return self.title


class Income(models.Model):
    """Модель прихода средств."""

    title = models.CharField("Наименование прихода", max_length=50)
    description = models.TextField(
        "Комментарий к приходу", max_length=500, blank=True, null=True
    )
    # category = models.ForeignKey(
    #     CategoryIncome,
    #     on_delete=models.SET_NULL,
    #     verbose_name="Категория дохода",
    #     blank=True,
    #     null=True,
    # )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        verbose_name="Приходы пользователя",
    )

    class Meta:
        verbose_name = "Приход средств"
        verbose_name_plural = "Приходы средств"
        default_related_name = "incomes"

    def __str__(self):
        return self.title


class MoneyBox(models.Model):
    """Модель копилка."""

    title = models.CharField("Цель накопления", max_length=254)
    accumulated = models.PositiveIntegerField(
        "Уже накоплено",
    )
    achieved = models.BooleanField(
        "Цель достигнута/не достигнута", default=False
    )
    # description = models.TextField(
    #     "Комментарий к приходу", max_length=500, blank=True, null=True
    # )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        verbose_name="Категория расхода",
        blank=True,
        null=True,
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="moneyboxes",
        verbose_name="Цель пользователя",
    )

    class Meta:
        verbose_name = "Цель накопления"
        verbose_name_plural = "Цели накопления"
        default_related_name = "moneyboxes"

    def __str__(self):
        return self.title

    @property
    def is_collected(self):
        return self.total == self.accumulated
