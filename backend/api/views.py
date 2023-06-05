from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.response import Response

from api.permissions import IsAuthor
from api.serializers import (
    AccountSerializer,
    AccountIconCreteSerializer,
    AcountIconGetSerializer,
    CategorySerializer,
    CategoryIconGetSerializer,
    CategoryIconCreateSerializer,
    IncomeSerializer,
    MoneyBoxSerializer,
    SpendSerializer,
)
from budget.models import Account, AccountIcon, Category, CategoryIcon, Income, MoneyBox, Spend
User = get_user_model()


class MoneyBoxViewSet(viewsets.ModelViewSet):
    serializer_class = MoneyBoxSerializer
    permission_classes = (IsAuthor,)

    def get_queryset(self):
        user = self.request.user
        return MoneyBox.objects.filter(user=user)

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
                # description=moneybox.description,
                category=moneybox.category,
                user=request.user,
            )


class IncomeViewSet(viewsets.ModelViewSet):
    serializer_class = IncomeSerializer
    permission_classes = (IsAuthor,)
    http_method_names = ['get']

    def get_queryset(self):
        user = self.request.user
        return Income.objects.filter(user=user)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
    

class SpendViewSet(viewsets.ModelViewSet):
    serializer_class = SpendSerializer
    permission_classes = (IsAuthor,)
    http_method_names = ['get']

    def get_queryset(self):
        user = self.request.user
        return Spend.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# class CategoryIncomeViewSet(viewsets.ModelViewSet):
#     queryset = CategoryIncome.objects.all()
#     serializer_class = CategoryIncomeSerializer
#     permission_classes = (IsAuthor,)

#     def get_queryset(self):
#         return CategoryIncome.objects.filter(user=self.request.user)

#     def perform_create(self, serializer):
#         return serializer.save(user=self.request.user)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Category.objects.filter(user=user)


class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    permission_classes = (IsAuthor,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Account.objects.filter(user=user)

    @action(
        detail=True, url_path="add_spend",
        methods=["POST"], url_name="add_spend",
        permission_classes=(IsAuthor,),
        serializer_class=SpendSerializer,
    )
    def add_spend(self, request, *args, **kwargs):
        user = request.user
        account = get_object_or_404(Account, id=kwargs['pk'])
        request_data = request.data
        amount = request_data.get('amount')

        if account.user != user:
            return Response(
                {"error": "Нельзя производить опрации не со своим счетом."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if amount > account.balance:
            return Response(
                {"error": "Сумма траты не может превышать сумму счёта."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        category_data = request_data.pop('category')
        category = Category.objects.get(id=category_data)

        new_spend = Spend.objects.create(**request_data, user=user)
        new_spend.category = category
        new_spend.save()
        account.balance -= amount
        account.save()

        serializer = SpendSerializer(new_spend)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    @action(
        detail=True, methods=["POST"],
        url_name='add_income', url_path='add_income',
        permission_classes=(IsAuthor,)
    )
    def add_income(self, request, *args, **kwargs):
        user = request.user
        account = get_object_or_404(Account, id=kwargs['pk'])
        request_data = request.data

        serializer = IncomeSerializer(data=request_data)
        serializer.is_valid(raise_exception=True)

        amount = request_data.get('amount')
        new_income = Income.objects.create(**request_data, user=user)
        account.balance += amount
        account.save()

        serializer = IncomeSerializer(new_income)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

        

class AccountIconViewSet(viewsets.ModelViewSet):
    queryset = AccountIcon.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == ["GET"]:
            return AcountIconGetSerializer
        return AccountIconCreteSerializer


class CategoryIconViewSet(viewsets.ModelViewSet):
    queryset = CategoryIcon.objects.all()

    def get_serializer_class(self):
        if self.request.method == ["GET"]:
            return CategoryIconGetSerializer
        return CategoryIconCreateSerializer
