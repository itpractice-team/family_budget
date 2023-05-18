from django.contrib import admin

from .models import (Balance, Category, Currency, Income, MoneyBox, Spend)


@admin.register(Balance)
class BalanceAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'balance')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'description',)


@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'code')


# @admin.register(UserCurrency)
# class UserCurrencyAdmin(admin.ModelAdmin):
#     list_display = ('id', 'user', 'current')


@admin.register(Spend)
class SpendAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'created', 'amount',
                    'description', 'category')


@admin.register(Income)
class IncomeAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'created', 'amount',
                    'description')


@admin.register(MoneyBox)
class MoneyBoxAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'total', 'accumulation',
                    'accumulated', 'achieved')
