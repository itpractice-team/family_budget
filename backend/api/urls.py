from django.urls import include, path
from rest_framework import routers

from api.views import (
    BudgetCategoryViewSet,
    BudgetFinanceViewSet,
    CategoryIconViewSet,
    FinanceHandBookViewSet,
)

app_name = "api"

router_v1 = routers.DefaultRouter()
router_v1.register(
    "category/icons", CategoryIconViewSet, basename="category_icons"
)
router_v1.register(
    "category", BudgetCategoryViewSet, basename="budget_category"
)
router_v1.register(
    "finance/handbook", FinanceHandBookViewSet, basename="finance_handbook"
)
router_v1.register("finance", BudgetFinanceViewSet, basename="budget_finance")
# router_v1.register("moneybox", MoneyBoxViewSet, basename="moneyboxs")
# router_v1.register("incomes", IncomeViewSet, basename="incomes")
# router_v1.register("accounts", AccountViewSet, basename="accounts")
# router_v1.register(
#     "account_icons", AccountIconViewSet, basename="account_icons"
# )
# router_v1.register("categories", CategoryViewSet, basename="categories")
# router_v1.register("spends", SpendViewSet, basename="spends")

urlpatterns = [
    path("", include(router_v1.urls)),
    path("users/", include("users.urls")),
    path("auth/", include("users.urls.authtoken")),
]
