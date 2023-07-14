from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import (
    OpenApiExample,
    extend_schema,
    extend_schema_view,
)
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

from api.filters import TransactionDateFromToRangeFilter
from api.serializers import (
    BudgetCategorySerializer,
    BudgetFinanceSerializer,
    BudgetParamsSerializer,
    BudgetUpdateFinanceSerializer,
    CategoryIconSerializer,
    FinanceHandBookSerializer,
    MoneyBoxSerializer,
    ReapeatSpendReadSerializer,
    ReapeatSpendWriteSerializer,
    StatisticsTransactionSerializer,
    TotalBudgetInfoSerializer,
    TransactionReadSerializer,
    TransactionWriteSerializer,
    TransferFinanceSerializer,
)
from budget.models import (
    Budget,
    BudgetCategory,
    BudgetFinance,
    Finance,
    FinanceTransaction,
    Icon,
    MoneyBox,
    ReapeatSpend,
)
from django_filters.rest_framework import DjangoFilterBackend

User = get_user_model()


class CategoryIconViewSet(ReadOnlyModelViewSet):
    """Иконки категорий."""

    queryset = Icon.objects.all()
    serializer_class = CategoryIconSerializer


class FinanceHandBookViewSet(ReadOnlyModelViewSet):
    """Справочник источников финансирований."""

    queryset = Finance.objects.all()
    serializer_class = FinanceHandBookSerializer


class BudgetBaseViewSet(viewsets.GenericViewSet):
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
    BudgetBaseViewSet,
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


class TransferFinanceViewSet(BudgetBaseViewSet):
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
    BudgetBaseViewSet,
):
    """Категории расходов и доходов для бюджета пользователя."""

    queryset = BudgetCategory.objects.all()
    serializer_class = BudgetCategorySerializer


class BudgetTransactionViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    BudgetBaseViewSet,
):
    """Транзакции бюджета пользователя."""

    queryset = FinanceTransaction.objects.all()

    def get_serializer_class(self):
        if self.action in ("list", "retrieve"):
            return TransactionReadSerializer
        return TransactionWriteSerializer


class ReapeatSpendViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    BudgetBaseViewSet,
):
    """Повтороряющиеся расходы."""

    queryset = ReapeatSpend.objects.all()

    def get_serializer_class(self):
        if self.action in ("list", "retrieve"):
            return ReapeatSpendReadSerializer
        return ReapeatSpendWriteSerializer


class MoneyBoxViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    BudgetBaseViewSet,
):
    """Конверты на накопления."""

    queryset = MoneyBox.objects.all()
    serializer_class = MoneyBoxSerializer


class TotalBudgetInfoViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """Детальная информаци по бюджету."""

    queryset = Budget.objects.all()
    serializer_class = TotalBudgetInfoSerializer

    def get_serializer_context(self):
        """Возвращает контекст сериализатора."""
        context = super().get_serializer_context()
        query = BudgetParamsSerializer(data=self.request.query_params)
        query.is_valid(raise_exception=True)
        query_params = query.validated_data
        context["from_date"] = query_params.get("from_date")
        context["to_date"] = query_params.get("to_date")
        categories = query_params.get("categories")
        context["categories"] = (
            [data.pk for data in categories] if categories else None
        )
        return context

    def get_queryset(self):
        queryset = super().get_queryset().filter(user=self.request.user)
        context = self.get_serializer_context()
        if context["from_date"]:
            queryset = queryset.filter(
                budget_financetransaction__created__lte=context["from_date"]
            )
        if context["to_date"]:
            queryset = queryset.filter(
                budget_financetransaction__created__gte=context["to_date"]
            )
        if context["categories"]:
            queryset = queryset.filter(
                budget_financetransaction__category__id__in=context[
                    "categories"
                ]
            ).distinct()
        return queryset


@extend_schema_view(
    list=extend_schema(
        summary="Список транзакций за период",
        examples=[
            OpenApiExample(
                "Статистика по транзакциям",
                description="Возвращает список транзакций для статистики",
                value={
                    "amount": 0,
                    "income": 1500,
                    "amountCategory": "Продукты",
                    "incomeCategory": None,
                    "color": "#12345A",
                    "icon": "some_icon",
                    "created": "2023-07-14T12:11:29.714Z",
                },
                status_codes=[str(status.HTTP_200_OK)],
            ),
        ],
    ),
)
class StatisticsTransactionViewSet(
    mixins.ListModelMixin,
    BudgetBaseViewSet,
):
    """Статистика по транзакциям."""

    queryset = FinanceTransaction.objects.all()
    serializer_class = StatisticsTransactionSerializer
    pagination_class = None
    filter_backends = [DjangoFilterBackend]
    filterset_class = TransactionDateFromToRangeFilter
