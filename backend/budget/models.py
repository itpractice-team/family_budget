from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import (
    MaxValueValidator,
    MinValueValidator,
    validate_slug,
)
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from slugify import slugify

User = get_user_model()

COMMON_VALIDATOR = [MinValueValidator(1), MaxValueValidator(1_000_000)]

MONEYBOX_VALIDATOR = [MinValueValidator(1), MaxValueValidator(10_000_000)]


def validate_date(value):
    if value > timezone.now():
        raise ValidationError("Дата не может быть больше текущей")
    return value


def image_directory_path(instance, filename):
    return f"{instance.image_directory}/{filename}"


class DafaultBaseModelDirectory(models.Model):
    """Базовая модель справочников."""

    image_directory = "image"
    name = models.CharField(_("name"), max_length=150, unique=True)
    image = models.ImageField(_("image"), upload_to=image_directory_path)
    slug = models.SlugField(
        _("slug"),
        unique=True,
        max_length=50,
        validators=[validate_slug],
        help_text=_("Required. Enter slug tag, please."),
        error_messages={
            "unique": _("A tag with that slug already exists."),
        },
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    class Meta:
        abstract = True


class DafaultFinance(DafaultBaseModelDirectory):
    """Модель дефолтного справочника для доходов."""

    image_directory = "finance"


class DefaultCategory(DafaultBaseModelDirectory):
    """Модель дефолтного справочника для категорий."""

    image_directory = "category"


class Account(models.Model):
    """Модель счета пользователя."""

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="balances",
        verbose_name="Баланс пользователя",
    )
    title = models.CharField("Название", max_length=70)
    # ingredients = models.ManyToManyField(
    #     Ingredient,
    #     verbose_name=_("ingredients"),
    #     blank=True,
    #     through="RecipeIngredient",
    #     related_name="recipes",
    # )

    # icon = models.ForeignKey(
    #     AccountIcon,
    #     on_delete=models.CASCADE,
    #     related_name="accounts",
    #     verbose_name="Иконка",
    #     null=True,
    # )
    balance = models.IntegerField("Баланс", default=0)

    class Meta:
        verbose_name = "Счет"
        verbose_name_plural = "Счета"

    def __str__(self):
        return f"Счета пользователя {self.user}"


class RecipeIngredient(models.Model):
    """Модель ингридиентов рецепта."""

    # recipe = models.ForeignKey(
    #     Recipe,
    #     verbose_name=_("recipe"),
    #     on_delete=models.CASCADE,
    #     related_name="recipe_ingredients",
    # )
    # ingredient = models.ForeignKey(
    #     Ingredient,
    #     verbose_name=_("ingredient"),
    #     on_delete=models.CASCADE,
    #     related_name="ingredient_recipes",
    # )
    amount = models.PositiveSmallIntegerField(
        _("amount"),
        validators=[
            MinValueValidator(
                1,
                message=_(
                    "The minimum quantity of an ingredient in a recipe is 1"
                ),
            )
        ],
    )

    class Meta:
        """Метаданные модели ингридиентов рецепта."""

        constraints = [
            models.UniqueConstraint(
                fields=["recipe", "ingredient"],
                name="unique_recipe_ingredient",
            )
        ]
        verbose_name = _("recipe ingredient")
        verbose_name_plural = _("recipe ingredients")

    def __str__(self):
        """Метод возвращает информацию по ингридиенту рецепта."""
        return f"{self.ingredient} - {self.amount}"


class Category(models.Model):
    """Модель категорий для трат."""

    title = models.CharField("Название категории", max_length=50, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    # icon = models.ForeignKey(
    #     CategoryIcon,
    #     on_delete=models.CASCADE,
    #     related_name="categories",
    #     verbose_name="Иконка",
    #     null=True,
    # )
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
