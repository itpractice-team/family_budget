from django.contrib import admin

from budget.models import Category, Currency


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "title",
        "description",
    )


@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "code")
