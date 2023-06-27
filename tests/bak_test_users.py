from django.conf import settings
from rest_framework import status

import pytest

from .serializers import (
    UserCreateRequestSerializer,
    UserCreateResponseSerializer,
    UserListResponseSerializer,
    UserRequestNewPasswordSerializer,
    UserResponseLoginSerializer,
    UserResponseSerializer,
)
from .utils import (
    check_bad_request,
    check_not_authorized,
    check_with_validate_data,
)


class TestUsersAPI:
    url_users = "/api/users/"
    url_me = "/api/users/me/"
    url_set_password = "/api/users/set_password/"
    url_login = "/api/auth/token/login/"
    url_logout = "/api/auth/token/logout/"

    def test_settings(self):
        assert hasattr(settings, "REST_FRAMEWORK"), (
            "Проверьте, что добавили настройку "
            "`REST_FRAMEWORK` в файл `settings.py`"
        )

        assert "DEFAULT_AUTHENTICATION_CLASSES" in settings.REST_FRAMEWORK, (
            "Проверьте, что добавили `DEFAULT_AUTHENTICATION_CLASSES` "
            "в `REST_FRAMEWORK` файла `settings.py`"
        )
        assert (
            "rest_framework.authentication.TokenAuthentication"
            in settings.REST_FRAMEWORK["DEFAULT_AUTHENTICATION_CLASSES"]
        ), (
            "Проверьте, что в списке значения `DEFAULT_AUTHENTICATION_CLASSES`"
            " в `REST_FRAMEWORK` содержится "
            "`rest_framework.authentication.TokenAuthentication`"
        )

    @pytest.mark.django_db(transaction=True)
    def test_list_users(self, client, user, another_user):
        check_with_validate_data(
            client,
            "get",
            self.url_users,
            serializer=UserListResponseSerializer,
            pagination=True,
        )

    @pytest.mark.django_db(transaction=True)
    def test_create_user_valid_request(self, client):
        data = {
            "email": "vpupkin10@yandex.ru",
            "username": "vasya10.pupkin",
            "first_name": "Вася",
            "last_name": "Пупкин",
            "password": "Qwerty145423@$@Qwerty756",
        }
        check_with_validate_data(
            client,
            "post",
            self.url_users,
            data=data,
            code=status.HTTP_201_CREATED,
            serializer=UserCreateResponseSerializer,
        )

    @pytest.mark.django_db(transaction=True)
    def test_create_user_bad_request(self, client):
        check_bad_request(
            client,
            "post",
            self.url_users,
            serializer=UserCreateRequestSerializer,
        )

    @pytest.mark.django_db(transaction=True)
    def test_get_user_profile_user_authorized(self, user_client, user):
        url = f"{self.url_users}{user.pk}/"
        check_with_validate_data(
            user_client, "get", url, serializer=UserCreateResponseSerializer
        )

    @pytest.mark.django_db(transaction=True)
    def test_get_user_profile_user_not_authorized(self, client, user):
        url = f"{self.url_users}{user.pk}/"
        check_not_authorized(client, "get", url)

    @pytest.mark.django_db(transaction=True)
    def test_get_user_me_authorized(self, user_client, user):
        check_with_validate_data(
            user_client, "get", self.url_me, serializer=UserResponseSerializer
        )

    @pytest.mark.django_db(transaction=True)
    def test_get_user_me_not_authorized(self, client, user):
        check_not_authorized(client, "get", self.url_me)

    @pytest.mark.django_db(transaction=True)
    def test_set_user_password_valid_request(self, user_client):
        url = self.url_set_password
        data = {
            "new_password": "Qwerty123@$@Qwerty756",
            "current_password": "1234567",
        }
        check_with_validate_data(
            user_client,
            "post",
            url,
            data=data,
            code=status.HTTP_204_NO_CONTENT,
        )

    @pytest.mark.django_db(transaction=True)
    def test_set_user_password_not_authorized(self, client):
        url = self.url_set_password
        check_not_authorized(client, "get", url)

    @pytest.mark.django_db(transaction=True)
    def test_set_user_password_bad_request(self, user_client):
        url = self.url_set_password
        check_bad_request(
            user_client,
            "post",
            url,
            serializer=UserRequestNewPasswordSerializer,
        )

    @pytest.mark.django_db(transaction=True)
    def test_login(self, client, user):
        url = self.url_login
        data = {"email": user.email, "password": "1234567"}
        check_with_validate_data(
            client,
            "post",
            url,
            data=data,
            serializer=UserResponseLoginSerializer,
        )

    @pytest.mark.django_db(transaction=True)
    def test_not_login(self, client, user):
        url = self.url_login
        check_bad_request(client, "post", url)

    @pytest.mark.django_db(transaction=True)
    def test_logout(self, user_client):
        url = self.url_logout
        check_with_validate_data(
            user_client, "post", url, code=status.HTTP_204_NO_CONTENT
        )

    @pytest.mark.django_db(transaction=True)
    def test_not_logout(self, client):
        url = self.url_logout
        check_not_authorized(client, "post", url)
