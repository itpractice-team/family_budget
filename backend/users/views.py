from djoser import utils
from djoser.conf import settings
from djoser.views import TokenCreateView, TokenDestroyView
from rest_framework import status
from rest_framework.response import Response


class CustomTokenCreateView(TokenCreateView):
    """Кастомный класс создания токена аутентификации пользователя."""

    def _action(self, serializer):
        token = utils.login_user(self.request, serializer.user)
        token_serializer_class = settings.SERIALIZERS.token
        return Response(
            data=token_serializer_class(
                token, context={"request": self.request}
            ).data,
            status=status.HTTP_200_OK,
        )


class CustomTokenDestroyView(TokenDestroyView):
    """Кастомный класс удаления токена аутентификации пользователя."""

    pass
