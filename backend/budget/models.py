from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import (
    MaxValueValidator,
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
)

User = get_user_model()

COMMON_VALIDATOR = [MinValueValidator(1), MaxValueValidator(1_000_000)]

MONEYBOX_VALIDATOR = [MinValueValidator(1), MaxValueValidator(10_000_000)]


def validate_date(value):
    if value > timezone.now():
        raise ValidationError("Дата не может быть больше текущей")
    return value


def image_directory_path(instance, filename):
    return f"{instance.image_directory}/{filename}"


class BaseDirectoryModel(models.Model):
    """Базовая модель справочников."""

    name = models.CharField(
        _("name"),
        max_length=25,
        validators=[validate_letter_or_blank_space, MinLengthValidator(2)],
    )
    description = models.TextField(_("description"), blank=True)

    class Meta:
        abstract = True
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
        verbose_name=_("Icon"),
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
        help_text=_("Required. Enter name budget, please."),
    )
    pub_date = models.DateTimeField(
        _("public date"), default=timezone.now, db_index=True
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="budgets",
        verbose_name=_("User budgets"),
    )
    description = models.TextField(
        _("Budget description"),
        blank=True,
    )

    class Meta:
        verbose_name = _("Budget")
        verbose_name_plural = _("Budgets")

    def __str__(self):
        """Возвращает информацию по бюджету пользователя."""
        return f"Бюджет пользователя {self.user}"


class IncomeExpenses(models.IntegerChoices):
    """Модель выбора дохода/расхода."""

    INCOME = 0, _("Income")
    EXPENSES = 1, _("Expenses")
    __empty__ = _("(Unknown)")


class BudgetCategories(Category):
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
        verbose_name = _("budget category")
        verbose_name_plural = _("budget categories")

    def __str__(self):
        """Метод возвращает информацию по категориям бюджета."""
        return f"{self.category} (тип {self.income_expenses})"


class BudgetFinances(models.Model):
    """Модель источников финансирования дохода/расхода для бюджета."""

    budget = models.ForeignKey(
        Budget,
        verbose_name=_("budget"),
        on_delete=models.CASCADE,
        related_name="budget_categories",
    )
    finance = models.ForeignKey(
        Finance,
        verbose_name=_("finance"),
        on_delete=models.CASCADE,
        related_name="finance_budgets",
    )
    balance = models.DecimalField(
        verbose_name=_("balance"),
        max_digits=15,
        decimal_places=0,
        null=True,
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
        return f"{self.category} (тип {self.income_expenses})"


class Spend(models.Model):
    """Модель расходов и трат."""

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, verbose_name="Траты пользователя"
    )
    title = models.CharField("Наименование расхода", max_length=70)
    created = models.DateTimeField(
        "Время создания записи", validators=[validate_date]
    )
    amount = models.PositiveIntegerField(
        "Израсходованная сумма", validators=COMMON_VALIDATOR
    )
    description = models.TextField(
        "Комментарий к расходу", max_length=500, blank=True, null=True
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        verbose_name="Категория расхода",
        blank=True,
        null=True,
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
    amount = models.PositiveIntegerField(
        "Оприходованная сумму", validators=COMMON_VALIDATOR
    )
    created = models.DateTimeField(
        "Время создания записи", validators=[validate_date]
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
    total = models.PositiveIntegerField(
        "Сумма, которую необходимо накопить", validators=MONEYBOX_VALIDATOR
    )
    accumulated = models.PositiveIntegerField(
        "Уже накоплено", validators=MONEYBOX_VALIDATOR
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
