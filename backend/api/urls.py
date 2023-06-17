from django.urls import include, path
from rest_framework import routers

from api.views import (
    BudgetCategoryViewSet,
    BudgetFinanceViewSet,
    BudgetTransactionViewSet,
    CategoryIconViewSet,
    FinanceHandBookViewSet,
    TransferFinanceViewSet,
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
router_v1.register(
    "finance", TransferFinanceViewSet, basename="transfers_finance"
)
router_v1.register("finance", BudgetFinanceViewSet, basename="budget_finance")
router_v1.register(
    "transaction", BudgetTransactionViewSet, basename="budget_transactions"
)
urlpatterns = [
    path("", include(router_v1.urls)),
    path("users/", include("users.urls")),
    path("auth/", include("users.urls.authtoken")),
]
