from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from budget.models import CategoryIncome, Income, MoneyBox

User = get_user_model()


class UserSerializer(UserCreateSerializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    first_name = serializers.CharField(allow_blank=True, required=False)
    last_name = serializers.CharField(allow_blank=True, required=False)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = User

        fields = (
            'username',
            'email',
            'id',
            'password',
            'first_name',
            'last_name',
            'avatar',
        )


class IncomeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Income
        fields = ('id', 'title', 'amount', 'created')


class MoneyBoxSerializer(serializers.ModelSerializer):

    class Meta:
        model = MoneyBox
        fields = ('id', 'title', 'total', 'accumulation',
                  'is_collected', 'achieved', 'description')

    def update(self, instance, validated_data):
        accumulation = validated_data.pop('accumulation', None)
        if accumulation is not None:
            summa = instance.accumulation + accumulation
            if instance.total < summa:
                ostotok = instance.total - instance.accumulation
                raise ValidationError(f'Для достижения цели нужно всего {ostotok}')
            instance.accumulation = summa
        return super().update(instance, validated_data)


class CategoryIncomeSerializer(serializers.ModelSerializer):

    class Meta:
        model = CategoryIncome
        fields = ('id', 'title', 'slug')
