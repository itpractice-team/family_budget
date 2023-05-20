from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    """Сериализатор данных пользователя."""

    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.CharField()


class UserCreateRequestSerializer(UserSerializer):
    """Сериализатор данных нового пользователя."""

    password = serializers.CharField()


class UserCreateResponseSerializer(UserSerializer):
    """Сериализатор данных нового пользователя."""

    id = serializers.IntegerField()


class UserResponseSerializer(UserCreateResponseSerializer):
    """Сериализатор данных по запрашиваемому пользователю."""

    is_subscribed = serializers.BooleanField()


class UserListResponseSerializer(serializers.ListSerializer):
    """Сериализатор списка данных пользователей."""

    child = UserResponseSerializer()


class UserRequestNewPasswordSerializer(serializers.Serializer):
    """Сериализатор запроса нового пароля пользователя."""

    new_password = serializers.CharField()
    current_password = serializers.CharField()


class UserRequestLoginSerializer(serializers.Serializer):
    """Сериализатор запроса токена пользователя."""

    email = serializers.CharField()
    password = serializers.CharField()


class UserResponseLoginSerializer(serializers.Serializer):
    """Сериализатор токена пользователя."""

    auth_token = serializers.CharField()
