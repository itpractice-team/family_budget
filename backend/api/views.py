from api.permissions import IsAuthor
from api.serializers import (
    CategoryIncomeSerializer,
    CategorySerializer,
    IncomeSerializer,
    MoneyBoxSerializer,
    SpendSerializer,
)
from budget.models import Category, CategoryIncome, Income, MoneyBox, Spend
from rest_framework import viewsets
from rest_framework.decorators import action


class MoneyBoxViewSet(viewsets.ModelViewSet):
    queryset = MoneyBox.objects.all()
    serializer_class = MoneyBoxSerializer
    permission_classes = (IsAuthor,)

    def get_queryset(self):
        return MoneyBox.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    @action(detail=True, methods=("post",))
    def goal_achieved(self, request, pk=None):
        moneybox = MoneyBox.objects.get(id=pk)
        if moneybox.is_collected:
            moneybox.achieved = True
            moneybox.save()
            Spend.objects.create(
                title=moneybox.title,
                amount=moneybox.total,
                description=moneybox.description,
                category=moneybox.category,
                user=request.user,
            )


class IncomeViewSet(viewsets.ModelViewSet):
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer
    permission_classes = (IsAuthor,)

    def get_queryset(self):
        return Income.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class CategoryIncomeViewSet(viewsets.ModelViewSet):
    queryset = CategoryIncome.objects.all()
    serializer_class = CategoryIncomeSerializer
    permission_classes = (IsAuthor,)

    def get_queryset(self):
        return CategoryIncome.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SpendViewSet(viewsets.ModelViewSet):
    queryset = Spend.objects.all()
    serializer_class = SpendSerializer
    permission_classes = (IsAuthor,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)