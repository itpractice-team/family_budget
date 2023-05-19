import pytest


@pytest.fixture
def another_user(django_user_model):
    return django_user_model.objects.create_user(
        username="AnotherUser",
        password="1234567",
        email="another@g.com",
        first_name="first_name_another",
        last_name="last_name_another",
    )


@pytest.fixture
def user(django_user_model, another_user):
    user_account = django_user_model.objects.create_user(
        username="TestUser",
        password="1234567",
        email="t1@g.com",
        first_name="first_name1",
        last_name="last_name1",
    )
    return user_account


@pytest.fixture
def token(user):
    from rest_framework.authtoken.models import Token

    token, _ = Token.objects.get_or_create(user=user)
    return token.key


@pytest.fixture
def user_client(token):
    from rest_framework.test import APIClient

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f"Token {token}")
    return client
