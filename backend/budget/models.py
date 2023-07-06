from django.contrib.auth import get_user_model
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
from core.fields import ImageAndSvgField
from core.validators import (
    validate_color_hex_code,
    validate_letter_or_blank_space,
    validate_only_letters_or_space,
)
from dateutil.relativedelta import relativedelta

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
                name="%(app_label)s_%(class)s_name_unique",
                violation_error_message=_("Name must be unique!"),
            ),
        ]

    @classmethod
    def get_default_use_records(cls, *fields, flat=False):
        queryset = cls.objects.filter(default_use=True)
        if flat:
            return queryset.values_list(flat=True)
        return queryset.values(*fields)


class DefaultUseMixin(models.Model):
    """Модель микшена для дефолтных значений в справочниках."""

    default_use = models.BooleanField(_("default_use"), default=False)

    class Meta:
        abstract = True

    @classmethod
    def get_default_use_records(cls, *fields):
        return cls.objects.filter(default_use=True).values(*fields)


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
    image = ImageAndSvgField(_("image"), upload_to=image_directory_path)

    class Meta:
        abstract = True


class Icon(IconMixin, models.Model):
    """Модель иконок."""

    image_directory = "category"
    tag = models.CharField(
        _("tag"),
        max_length=25,
        validators=[validate_letter_or_blank_space, MinLengthValidator(2)],
        unique=True,
    )

    class Meta:
        verbose_name = _("Icon")
        verbose_name_plural = _("Icons")

    def __str__(self):
        """Метод возвращает информацию по иконке."""
        return self.tag


class Finance(BaseDirectoryModel, IconMixin, SlugMixin, DefaultUseMixin):
    """Модель справочника для источника дохода/списания(счет)."""

    image_directory = "finance"

    class Meta(BaseDirectoryModel.Meta):
        verbose_name = _("Finance")
        verbose_name_plural = _("Finances")

    def __str__(self):
        """Метод возвращает информацию по источнику финансирования."""
        return self.name


class IncomeExpenses(models.IntegerChoices):
    """Модель выбора дохода/расхода."""

    EXPENSES = 1, _("Expenses")
    INCOME = 2, _("Income")


class BaseCategory(BaseDirectoryModel):
    """Базовая модель спровочника категорий."""

    icon = models.ForeignKey(
        Icon,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name=_("icon"),
    )
    category_type = models.IntegerField(
        verbose_name=_("type"),
        choices=IncomeExpenses.choices,
        default=IncomeExpenses.EXPENSES,
    )

    class Meta(BaseDirectoryModel.Meta):
        abstract = True
        default_related_name = "%(app_label)s_%(class)s"


class Category(BaseCategory, DefaultUseMixin):
    """Модель cправочника для дефолтных категорий."""

    class Meta(BaseCategory.Meta):
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


class BudgetCategory(BaseCategory):
    """Модель категорий дохода/расхода для бюджета."""

    budget = models.ForeignKey(
        Budget,
        verbose_name=_("budget"),
        on_delete=models.CASCADE,
        related_name="categories",
    )
    color = ColorField(
        _("color HEX-code"),
        max_length=7,
        blank=True,
        validators=[validate_color_hex_code],
        help_text=_("Not required. Enter HEX-code color, please."),
    )

    class Meta(BaseCategory.Meta):
        """Метаданные модели категорий бюджета."""

        constraints = [
            models.UniqueConstraint(
                Lower("name"),
                "budget",
                "category_type",
                name="%(app_label)s_%(class)s_name_budget_category_type",
                violation_error_message=_(
                    "The budget category name must be unique!"
                ),
            )
        ]
        verbose_name = _("Budget category")
        verbose_name_plural = _("Budget categories")

    def __str__(self):
        """Метод возвращает информацию по категориям бюджета."""
        return f"{self.name} (тип {self.category_type})"


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

        ordering = ["finance__priority", "finance__name"]
        constraints = [
            models.UniqueConstraint(
                fields=["budget", "finance"],
                name="unique_budget_finance",
                violation_error_message=_(
                    "The funding source for the budget must be unique"
                ),
            )
        ]
        verbose_name = _("Budget finance")
        verbose_name_plural = _("Budget finances")

    def __str__(self):
        """Метод возвращает информацию по источникам финансирования."""
        return f"{self.budget} ({self.finance} => баланс {self.balance})"


class BaseFinance(models.Model):
    """Базовая модель финансовой модели."""

    name = models.CharField(
        _("name"),
        max_length=15,
        validators=[validate_only_letters_or_space, MinLengthValidator(2)],
    )
    created = models.DateTimeField(
        _("created"),
        default=timezone.now,
        db_index=True,
        validators=[
            MaxValueValidator(
                timezone.now,
                message=_("Creation date must not exceed the current date!"),
            )
        ],
    )
    amount = models.DecimalField(
        verbose_name=_("amount"),
        max_digits=15,
        decimal_places=0,
        default=0,
    )
    budget = models.ForeignKey(
        Budget,
        verbose_name=_("budget"),
        on_delete=models.CASCADE,
    )
    description = models.TextField(
        _("description"),
        max_length=100,
        blank=True,
    )

    class Meta:
        abstract = True
        default_related_name = "%(app_label)s_%(class)s"
        ordering = ["-created"]


class BaseTransaction(BaseFinance):
    """Базовая модель финансовой транзакции."""

    category = models.ForeignKey(
        BudgetCategory,
        on_delete=models.SET_NULL,
        verbose_name=_("category"),
        null=True,
    )

    class Meta(BaseFinance.Meta):
        abstract = True


class FinanceTransaction(BaseTransaction):
    """Модель финансовой транзакции."""

    finance = models.ForeignKey(
        BudgetFinance,
        on_delete=models.SET_NULL,
        verbose_name=_("finance"),
        null=True,
    )
    category_type = models.IntegerField(
        verbose_name=_("type"),
        choices=IncomeExpenses.choices,
        default=IncomeExpenses.EXPENSES,
    )

    class Meta(BaseTransaction.Meta):
        verbose_name = _("Transaction")
        verbose_name_plural = _("Transactions")

    @property
    def is_consumption(self):
        """Проверка транзакции на тип `Расход`."""
        return self.amount < 0

    @property
    def is_income(self):
        """Проверка транзакции на тип `Доход`."""
        return not self.is_consumption()


class ConsumptionPeriod(models.IntegerChoices):
    """Модель выбора периода для повторяющегося расхода."""

    DAY = 0, _("Day")
    WEEK = 1, _("Week")
    MONTH = 2, _("Month")
    YEAR = 3, _("Year")


class DateRepeat(models.IntegerChoices):
    """Модель выбора типа для повторяющегося периода."""

    ENDLESSLY = 0, _("Endlessly")
    LIMIT_COUNT = 1, _("Count")
    LIMIT_DATE = 2, _("Date")


class ReapeatSpend(BaseTransaction):
    """Модель повторяющихся платежей."""

    name = models.CharField(
        _("name"),
        max_length=50,
        validators=[validate_letter_or_blank_space, MinLengthValidator(2)],
    )
    repeat_type = models.IntegerField(
        verbose_name=_("type"),
        choices=ConsumptionPeriod.choices,
    )
    repeat_count = models.PositiveIntegerField(
        verbose_name=_("count"),
        default=1,
        validators=[
            MinValueValidator(1, message=_("Minimum value repeat count is 1"))
        ],
    )
    repeat_period = models.IntegerField(
        verbose_name=_("period"),
        choices=DateRepeat.choices,
    )
    to_date = models.DateTimeField(_("to_date"), null=True)
    amount = models.DecimalField(
        verbose_name=_("amount"),
        max_digits=15,
        decimal_places=0,
        default=0,
        validators=[
            MinValueValidator(0, message=_("Minimum value for amount is 0"))
        ],
    )

    class Meta(BaseTransaction.Meta):
        constraints = [
            models.CheckConstraint(
                check=(
                    models.Q(to_date__isnull=True)
                    | models.Q(to_date__gte=models.F("created"))
                ),
                name="check_not_to_date_less_created",
                violation_error_message=_(
                    "Date before must be "
                    "greater than or equal to the creation date"
                ),
            ),
        ]
        verbose_name = _("Reapeat spend")
        verbose_name_plural = _("Reapeat spends")

    @property
    def calc_comlete_date(self):
        """Возвращает дату завершения повторов."""
        if self.repeat_period == DateRepeat.ENDLESSLY:
            return None
        if self.repeat_period == DateRepeat.LIMIT_DATE:
            return self.to_date
        delta_param = f"{ConsumptionPeriod.labels[self.repeat_type].lower()}s"
        return self.created + relativedelta(**{delta_param: self.repeat_count})

    def is_open_by_date(self, date):
        """Возвращает статус на незавершенность повторного платежа."""
        comlete_date = self.calc_comlete_date()
        return comlete_date is not None and date <= comlete_date

    @property
    def is_open_now(self):
        return self.is_open_by_date(timezone.now())


class MoneyBox(BaseFinance):
    """Модель копилки."""

    name = models.CharField(
        _("name"),
        max_length=50,
        validators=[validate_letter_or_blank_space, MinLengthValidator(2)],
    )
    amount = models.DecimalField(
        verbose_name=_("amount"),
        max_digits=15,
        decimal_places=0,
        default=0,
        validators=[
            MinValueValidator(0, message=_("Minimum value for amount is 0"))
        ],
    )
    accumulated = models.DecimalField(
        verbose_name=_("accumulated"),
        max_digits=15,
        decimal_places=0,
        default=0,
        validators=[
            MinValueValidator(
                0, message=_("Minimum value for accumulated is 0")
            )
        ],
    )

    class Meta(BaseFinance.Meta):
        constraints = [
            models.CheckConstraint(
                check=(models.Q(amount__gte=models.F("accumulated"))),
                name="check_amount_less_accumulated",
                violation_error_message=_(
                    "The accumulated amount " "cannot be more than the total"
                ),
            ),
        ]
        verbose_name = _("Moneybox")
        verbose_name_plural = _("Moneyboxes")

    def __str__(self):
        return self.name

    @property
    def required_funds(self):
        return self.amount - self.accumulated

    @property
    def is_collected(self):
        return not bool(self.required_funds())
