from django.contrib.auth import get_user_model
from djoser.serializers import (
    TokenSerializer,
    UserCreateSerializer,
    UserSerializer,
)
from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from budget.models import (
    Account,
    AccountIcon,
    Category,
    CategoryIcon,
    Income,
    MoneyBox,
    Spend,
)

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


class AccountIconCreteSerializer(serializers.ModelSerializer):
    image = Base64ImageField(max_length=None, use_url=True, required=True)
    slug = serializers.SlugField(required=True)

    class Meta:
        model = AccountIcon
        fields = ("id", "title", "image", "slug")

    def validate_image(self, image):
        if image is None:
            raise serializers.ValidationError(
                "Поле `image` должно быть в формате Base64"
            )
        return image


class AcountIconGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountIcon
        fields = ("id", "title", "image", "slug")


class AccountSerializer(serializers.ModelSerializer):
    icon = serializers.PrimaryKeyRelatedField(
        queryset=AccountIcon.objects.all(),
    )
    balance = serializers.IntegerField(required=True)

    class Meta:
        model = Account
        fields = ("id", "title", "icon", "balance")

    def to_representation(self, instance):
        data = super().to_representation(instance)
        icon_id = data.get("icon")
        icon = AccountIcon.objects.get(id=icon_id)
        icon_serializer = AcountIconGetSerializer(icon)
        data["icon"] = icon_serializer.data
        return data


class CategoryIconCreateSerializer(serializers.ModelSerializer):
    image = Base64ImageField(max_length=None, use_url=True, required=True)
    slug = serializers.SlugField(required=True)

    class Meta:
        model = CategoryIcon
        fields = ("id", "title", "image", "slug")

    def validate_image(self, image):
        if image is None:
            raise serializers.ValidationError(
                "Поле `image` должно быть в формате Base64"
            )
        return image


class CategoryIconGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryIcon
        fields = ("id", "title", "image", "slug")


class CategorySerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(required=True)
    icon = serializers.PrimaryKeyRelatedField(
        queryset=CategoryIcon.objects.all(),
    )

    class Meta:
        model = Category
        fields = ("id", "title", "icon", "color", "slug")

    def to_representation(self, instance):
        data = super().to_representation(instance)
        icon_id = data.get("icon")
        icon = CategoryIcon.objects.get(id=icon_id)
        icon_serializer = CategoryIconGetSerializer(icon)
        data["icon"] = icon_serializer.data
        return data


# class CategoryIncomeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CategoryIncome
#         fields = ("id", "title", "description")


class IncomeSerializer(serializers.ModelSerializer):
    # category = serializers.PrimaryKeyRelatedField(
    #     queryset=CategoryIncome.objects.all(),
    # )

    class Meta:
        model = Income
        fields = ("id", "title", "amount", "created")


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
            "accumulated",
            # "is_collected",
            "achieved",
            "category",
        )

    def update(self, instance, validated_data):
        accumulated = validated_data.pop("accumulated", None)
        if accumulated is not None:
            new_total = instance.accumulated + accumulated
            if instance.total < new_total:
                remaining = instance.total - instance.accumulated
                raise ValidationError(
                    f"Для достижения цели нужно всего {remaining}"
                )
            instance.accumulated = new_total
        return super().update(instance, validated_data)


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
