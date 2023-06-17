from django.contrib.auth import get_user_model
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from api.serializers import (
    BudgetCategorySerializer,
    BudgetFinanceSerializer,
    BudgetUpdateFinanceSerializer,
    CategoryIconSerializer,
    FinanceHandBookSerializer,
    TransferFinanceSerializer,
)
from budget.models import BudgetCategory, BudgetFinance, Finance, Icon

User = get_user_model()


class CategoryIconViewSet(ReadOnlyModelViewSet):
    """Иконки категорий."""

    queryset = Icon.objects.all()
    serializer_class = CategoryIconSerializer


class FinanceHandBookViewSet(ReadOnlyModelViewSet):
    """Справочник источников финансирований."""

    queryset = Finance.objects.all()
    serializer_class = FinanceHandBookSerializer


class BudgeBaseiewSet(viewsets.GenericViewSet):
    """Базовый Viewset бюджета пользователя."""

    def get_queryset(self):
        return self.queryset.filter(budget=self.request.user.budgets.first())


class BudgetFinanceViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    BudgeBaseiewSet,
):
    """Источники финансирования бюджета пользователя."""

    queryset = BudgetFinance.objects.all()
    serializer_class = BudgetFinanceSerializer
    lookup_field = "finance_id"

    def get_serializer_class(self):
        if self.action in ("update", "partial_update"):
            return BudgetUpdateFinanceSerializer
        return BudgetFinanceSerializer

    @action(methods=["post"], detail=False)
    def transfer(self, request, *args, **kwargs):
        """Перевод баланса между счетами."""
        serializer = TransferFinanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validate["user_ids"]
            # for user_id in user_ids:
            #     target_user = User.objects.get(pk=user_id)
            #     Follow.objects.create(user=user, target=target_user)
            return Response(status=status.HTTP_204_NO_CONTENT)


class BudgetCategoryViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    BudgeBaseiewSet,
):
    """Категории расходов и доходов для бюджета пользователя."""

    queryset = BudgetCategory.objects.all()
    serializer_class = BudgetCategorySerializer
