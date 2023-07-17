from django.contrib.auth import get_user_model
from django.core.management import BaseCommand
from django.db import transaction

from budget.models import (
    Budget,
    BudgetCategory,
    BudgetFinance,
    Category,
    Finance,
    FinanceTransaction,
)
from core.utils import (
    create_model_link_budget_data,
    create_ordered_dicts_from_objects,
)

User = get_user_model()


class Command(BaseCommand):
    """Команда для тестовыми данным БД."""

    help = "Init DB. "

    def handle(self, *args, **kwargs):
        with transaction.atomic():
            user = User.objects.create_user(
                **{
                    "username": "staticsgr",
                    "password": "superslozhniparol",
                    "email": "megatron10@example.com",
                    "first_name": "Mega",
                    "last_name": "Cybertron",
                }
            )
            budget = Budget.objects.create(
                name=f"{('Test budget users')} {user.username}",
                user=user,
            )
            create_model_link_budget_data(
                budget,
                BudgetCategory,
                Category.get_default_use_records(
                    "name",
                    "priority",
                    "icon_id",
                    "category_type",
                ),
            )
            create_model_link_budget_data(
                budget,
                BudgetFinance,
                create_ordered_dicts_from_objects(
                    Finance.get_default_use_records(flat=True), "finance_id"
                ),
            )
            create_model_link_budget_data(
                budget,
                FinanceTransaction,
                create_ordered_dicts_from_objects(
                    Finance.get_default_use_records(flat=True), "finance_id"
                ),
            )
