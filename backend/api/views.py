from budget.models import CategoryIncome, Income, MoneyBox
from rest_framework import viewsets

from .permissions import IsAuthor
from .serializers import CategoryIncomeSerializer, IncomeSerializer, MoneyBoxSerializer


class MoneyBoxViewSet(viewsets.ModelViewSet):
    queryset = MoneyBox.objects.all()
    serializer_class = MoneyBoxSerializer
    permission_classes = (IsAuthor,)

    def get_queryset(self):
        return MoneyBox.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


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
