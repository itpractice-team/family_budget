from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

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
