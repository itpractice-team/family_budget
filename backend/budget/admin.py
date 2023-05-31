from budget.models import Category, Currency
from django.contrib import admin


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
