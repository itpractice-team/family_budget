from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

User = get_user_model()


class UserSerializer(UserCreateSerializer):
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())])
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    avatar = serializers.ImageField()

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
