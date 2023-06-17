from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
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
    TransactionReadSerializer,
    TransactionWriteSerializer,
    TransferFinanceSerializer,
)
from budget.models import (
    BudgetCategory,
    BudgetFinance,
    Finance,
    FinanceTransaction,
    Icon,
)

User = get_user_model()


class CategoryIconViewSet(ReadOnlyModelViewSet):
    """Иконки категорий."""

    queryset = Icon.objects.all()
    serializer_class = CategoryIconSerializer


class FinanceHandBookViewSet(ReadOnlyModelViewSet):
    """Справочник источников финансирований."""

    queryset = Finance.objects.all()
    serializer_class = FinanceHandBookSerializer


class BudgeBaseViewSet(viewsets.GenericViewSet):
    """Базовый Viewset бюджета пользователя."""

    def get_budget(self):
        return self.request.user.budgets.first()

    def get_queryset(self):
        return self.queryset.filter(budget=self.get_budget())


class BudgetFinanceViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    BudgeBaseViewSet,
):
    """Источники финансирования бюджета пользователя."""

    queryset = BudgetFinance.objects.all()
    serializer_class = BudgetFinanceSerializer

    def get_serializer_class(self):
        if self.action in ("update", "partial_update"):
            return BudgetUpdateFinanceSerializer
        return BudgetFinanceSerializer

    def get_object(self):
        """Возвращает объект по finance_id."""
        queryset = self.get_queryset()
        pk = self.request.parser_context["kwargs"]["pk"]
        return get_object_or_404(queryset.filter(finance=pk))


class TransferFinanceViewSet(BudgeBaseViewSet):
    """Источники финансирования бюджета пользователя."""

    queryset = BudgetFinance.objects.all()
    serializer_class = TransferFinanceSerializer

    @action(methods=["post"], detail=False)
    def transfer(self, request, *args, **kwargs):
        """Перевод баланса между счетами."""
        serializer = TransferFinanceSerializer(
            data=request.data, context={"budget": self.get_budget()}
        )
        if serializer.is_valid(raise_exception=True):
            amount = serializer.validated_data["amount"]
            debet_obj = serializer.validated_data["obj_from_finance"]
            debet_obj.balance -= amount
            debet_obj.save()
            credit_obj = serializer.validated_data["obj_to_finance"]
            credit_obj.balance += amount
            credit_obj.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class BudgetCategoryViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    BudgeBaseViewSet,
):
    """Категории расходов и доходов для бюджета пользователя."""

    queryset = BudgetCategory.objects.all()
    serializer_class = BudgetCategorySerializer


class BudgetTransactionViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    BudgeBaseViewSet,
):
    """Транзакции бюджета пользователя."""

    queryset = FinanceTransaction.objects.all()
    serializer_class = BudgetCategorySerializer

    def get_serializer_class(self):
        if self.action in ("list", "retrieve"):
            return TransactionReadSerializer
        return TransactionWriteSerializer
