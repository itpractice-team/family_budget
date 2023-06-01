from django.urls import include, path
from rest_framework import routers

from api.views import (
    CategoryIncomeViewSet,
    CategoryViewSet,
    IncomeViewSet,
    MoneyBoxViewSet,
    SpendViewSet,
)

app_name = "api"

router_v1 = routers.DefaultRouter()
router_v1.register("moneybox", MoneyBoxViewSet, basename="moneyboxs")
router_v1.register("income", IncomeViewSet, basename="incomes")
router_v1.register(
    "categoryincome", CategoryIncomeViewSet, basename="category_incomes"
)
router_v1.register("categories", CategoryViewSet, basename="categories")
router_v1.register("spends", SpendViewSet, basename="spends")

urlpatterns = [
    path("", include(router_v1.urls)),
    path("users/", include("users.urls")),
    path("auth/", include("users.urls.authtoken")),
]