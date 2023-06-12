from django.contrib.auth import get_user_model
from django.db import transaction
from django.utils.translation import gettext_lazy as _
from djoser.conf import settings
from djoser.serializers import (
    TokenSerializer,
    UserCreateSerializer,
    UserSerializer,
)
from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

# from rest_framework.exceptions import ValidationError
from api.fields import PrimaryKey404RelatedField
from budget.models import (
    Budget,
    BudgetCategory,
    BudgetFinance,
    Category,
    Finance,
    Icon,
)
from core.utils import (
    create_model_link_budget_data,
    create_ordered_dicts_from_objects,
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

    def perform_create(self, validated_data):
        with transaction.atomic():
            user = User.objects.create_user(**validated_data)
            budget = Budget.objects.create(
                name=f"{_('Default budget users')} {user.username}",
                user=user,
            )
            create_model_link_budget_data(
                budget,
                BudgetCategory,
                Category.get_default_use_records(
                    "name", "priority", "image_id"
                ),
            )
            create_model_link_budget_data(
                budget,
                BudgetFinance,
                create_ordered_dicts_from_objects(
                    Finance.get_default_use_records(flat=True), "finance_id"
                ),
            )
            if settings.SEND_ACTIVATION_EMAIL:
                user.is_active = False
                user.save(update_fields=["is_active"])
        return user


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


class CategoryIconSerializer(serializers.ModelSerializer):
    """Сериализатор иконок для категорий."""

    class Meta:
        model = Icon
        fields = ["id", "image"]


class FinanceHandBookSerializer(serializers.ModelSerializer):
    """Сериализатор справочника истоичника финансирований."""

    class Meta:
        model = Finance
        fields = "__all__"


class FinanceDetailInfoSerializer(serializers.ModelSerializer):
    """Сериализатор с детальной информацией по отдельному счету бюджета."""

    class Meta:
        model = Finance
        fields = (
            "id",
            "name",
            "image",
        )


class BudgetFinanceSerializer(serializers.ModelSerializer):
    """Сериализатор счетов для бюджета."""

    id = PrimaryKey404RelatedField(
        queryset=Finance.objects.all(), source="finance"
    )
    name = serializers.ReadOnlyField(source="finance.name")
    image = serializers.ImageField(
        source="finance.image",
        use_url=True,
        read_only=True,
    )

    class Meta:
        model = BudgetFinance
        fields = (
            "id",
            "name",
            "image",
            "balance",
        )


class BudgetCategorySerializer(serializers.ModelSerializer):
    """Сериализатор тегов."""

    class Meta:
        model = BudgetCategory
        fields = "__all__"
