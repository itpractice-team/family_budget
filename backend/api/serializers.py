from django.contrib.auth import get_user_model
from djoser.serializers import (
    TokenSerializer,
    UserCreateSerializer,
    UserSerializer,
)
from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from budget.models import Category, CategoryIncome, Income, MoneyBox, Spend

User = get_user_model()


class AvatarMixin(serializers.Serializer):
    avatar = Base64ImageField(max_length=None, use_url=True, required=False)


class CustomUserCreateSerializer(AvatarMixin, UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = UserCreateSerializer.Meta.fields + (
            "first_name",
            "last_name",
            "avatar",
        )


class CustomUserSerializer(AvatarMixin, UserSerializer):
    class Meta(UserSerializer.Meta):
        read_only_fields = None
        fields = UserSerializer.Meta.fields + (
            "first_name",
            "last_name",
            "avatar",
        )


class CustomDeleteUserSerializer(serializers.Serializer):
    pass


class CustomTokenSerializer(TokenSerializer):
    id = serializers.IntegerField(source="user.id")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    avatar = serializers.ImageField(source="user.avatar", use_url=True)

    class Meta(TokenSerializer.Meta):
        fields = TokenSerializer.Meta.fields + (
            "id",
            "first_name",
            "last_name",
            "avatar",
        )

    def to_representation(self, instance):
        self
        token_info = super().to_representation(instance)
        if "request" not in self.context:
            token_info["avatar"] = "127.0.0.1/" + token_info["avatar"]
        return token_info


class CategoryIncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryIncome
        fields = ("id", "title", "description")


class IncomeSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=CategoryIncome.objects.all(),
    )

    class Meta:
        model = Income
        fields = ("id", "title", "amount", "created", "category")


class MoneyBoxSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
    )

    class Meta:
        model = MoneyBox
        fields = (
            "id",
            "title",
            "total",
            "accumulation",
            "is_collected",
            "achieved",
            "category",
            "description",
        )

    def update(self, instance, validated_data):
        accumulation = validated_data.pop("accumulation", None)
        if accumulation is not None:
            summa = instance.accumulation + accumulation
            if instance.total < summa:
                ostotok = instance.total - instance.accumulation
                raise ValidationError(
                    f"Для достижения цели нужно всего {ostotok}"
                )
            instance.accumulation = summa
        return super().update(instance, validated_data)


class CategorySerializer(serializers.ModelSerializer):
    slug = serializers.ReadOnlyField()

    class Meta:
        model = Category
        fields = (
            "id",
            "slug",
            "title",
            "description",
        )


class SpendSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
    )

    class Meta:
        model = Spend
        fields = (
            "id",
            "title",
            "amount",
            "created",
            "description",
            "category",
        )

    def to_representation(self, instance):
        data = super().to_representation(instance)
        category_id = data.get("category")
        category = Category.objects.get(pk=category_id)
        category_serializer = CategorySerializer(category)
        data["category"] = category_serializer.data
        return data
