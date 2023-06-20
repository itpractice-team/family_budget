from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone
from slugify import slugify

User = get_user_model()

COMMON_VALIDATOR = [MinValueValidator(1), MaxValueValidator(1_000_000)]

MONEYBOX_VALIDATOR = [MinValueValidator(1), MaxValueValidator(10_000_000)]


def validate_date(value):
    if value > timezone.now():
        raise ValidationError("Дата не может быть больше текущей")
    return value


class BaseIcon(models.Model):
    """Модель иконки."""

    title = models.CharField(max_length=100)
    image = models.ImageField(
        upload_to=None,
    )
    slug = models.SlugField(
        max_length=100,
        unique=True,
        blank=True,
    )

    class Meta:
        abstract = True


class AccountIcon(BaseIcon):
    """Модель иконки счета."""

    image = models.ImageField(
        upload_to="account_icons",
    )


class CategoryIcon(BaseIcon):
    """Модель иконки категории."""

    image = models.ImageField(
        upload_to="category_icons",
    )


class Account(models.Model):
    """Модель счета пользователя."""

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="balances",
        verbose_name="Баланс пользователя",
    )
    title = models.CharField("Название", max_length=70)
    icon = models.ForeignKey(
        AccountIcon,
        on_delete=models.CASCADE,
        related_name="accounts",
        verbose_name="Иконка",
        null=True,
    )
    balance = models.IntegerField("Баланс", default=0)

    class Meta:
        verbose_name = "Счет"
        verbose_name_plural = "Счета"

    def __str__(self):
        return f"Счета пользователя {self.user}"


class Category(models.Model):
    """Модель категорий для трат."""

    title = models.CharField("Название категории", max_length=50, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    icon = models.ForeignKey(
        CategoryIcon,
        on_delete=models.CASCADE,
        related_name="categories",
        verbose_name="Иконка",
        null=True,
    )
    color = models.CharField(
        max_length=7,
        unique=True,
        blank=True,
        verbose_name="Цвет категории расхода",
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="categories",
        verbose_name="Категории созданные пользователем",
    )

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


# class Currency(models.Model):
#     """Модель валют."""

#     title = models.CharField(
#         "Полное название валюты", unique=True, max_length=50
#     )
#     code = models.CharField(
#         "Буквенный код валюты", unique=True, max_length=3
#     )

#     class Meta:
#         verbose_name = "Валюта"
#         verbose_name_plural = "Валюты"
#         default_related_name = "currencies"

#     def __str__(self):
#         return self.title


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


# class CategoryIncome(models.Model):
#     """Модель Категорий для доходных средств."""

#     title = models.CharField(
#       "Название категории", max_length=150, unique=True
#     )
#     user = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE,
#         related_name="category_incomes",
#         verbose_name="Категория дохода пользователя",
#     )
#     description = models.TextField(
#         "Комментарий к категории дохода",
#         max_length=500,
#         blank=True,
#         null=True
#     )


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
