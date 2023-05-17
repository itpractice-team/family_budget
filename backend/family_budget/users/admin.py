from django.contrib import admin

from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'avatar')
    list_display_links = ('username',)
    search_fields = ('email', 'username', 'first_name', 'last_name', 'avatar')
    empty_value_display = '-empty-'
