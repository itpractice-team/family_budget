from django.contrib import admin
from django.utils.html import mark_safe
from django.utils.translation import gettext_lazy as _

from budget.models import Category, Finance, Icon


class ImageAdmin(admin.ModelAdmin):
    """Базовый класс для моделей с картинками в админке."""

    def image_tag(self, obj):
        """Прорисовка изображения рецепта."""
        if obj.image:
            url = (
                obj.image.image.url
                if isinstance(obj.image, Icon)
                else obj.image.url
            )
            return mark_safe(f'<img src="{url}" height="25" />')
        return None

    image_tag.short_description = _("image")


@admin.register(Category)
class CategoryAdmin(ImageAdmin):
    """Конфигурация для модели Category в админке."""

    list_display = (
        "name",
        "priority",
        "image_tag",
    )
    list_filter = (
        "name",
        "priority",
    )
    search_fields = ("name",)
    empty_value_display = _("empty")


@admin.register(Icon)
class IconAdmin(ImageAdmin):
    """Конфигурация для модели Icon в админке."""

    list_display = ("tag", "image_tag")
    list_filter = ("tag",)
    search_fields = ("tag",)
    empty_value_display = _("empty")


@admin.register(Finance)
class FinanceAdmin(admin.ModelAdmin):
    """Конфигурация для модели Finance в админке."""

    list_display = (
        "name",
        "priority",
        "slug",
        "description",
    )
    list_filter = (
        "name",
        "priority",
        "slug",
    )
    search_fields = (
        "name",
        "slug",
    )
    empty_value_display = _("empty")
