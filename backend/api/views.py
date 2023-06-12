from django.contrib.auth import get_user_model

# from django.shortcuts import get_object_or_404
# from drf_spectacular.utils import (
#     PolymorphicProxySerializer,
#     extend_schema,
#     extend_schema_view,
# )
from rest_framework import mixins

# , status, viewsets
# from rest_framework.decorators import action
# from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from api.serializers import (
    BudgetCategorySerializer,
    BudgetFinanceSerializer,
    CategoryIconSerializer,
    FinanceHandBookSerializer,
)
from api.viewsets import BudgetDataViewSet
from budget.models import BudgetCategory, BudgetFinance, Finance, Icon

User = get_user_model()


class CategoryIconViewSet(ReadOnlyModelViewSet):
    """ViewSet-класс для просмотра иконок категорий."""

    queryset = Icon.objects.all()
    serializer_class = CategoryIconSerializer


class FinanceHandBookViewSet(ReadOnlyModelViewSet):
    """ViewSet-класс для просмотра справочник источника финансирований."""

    queryset = Finance.objects.all()
    serializer_class = FinanceHandBookSerializer


class BudgetFinanceViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    BudgetDataViewSet,
):
    """ViewSet-класс для модели источников финансирования бюджета."""

    serializer_class = BudgetFinanceSerializer
    queryset = BudgetFinance.objects.all()
    budget_field = "budget"
    obj_field = "finance"
    obj_model = Finance

    def get_queryset(self):
        """Возвращает выборку данных по сточнику финансирования для бюджета."""
        return BudgetFinance.objects.filter(
            budget=self.request.user.budgets.first()
        )


class BudgetCategoryViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    BudgetDataViewSet,
):
    """ViewSet-класс для модели категорий бюджета."""

    serializer_class = BudgetCategorySerializer
    budget_field = "user"
    obj_field = "author"
    obj_model = User

    def get_queryset(self):
        """Возвращает выборку данных по категория для бюджета."""
        return BudgetCategory.objects.filter(budget=self.request.user.budgets)
