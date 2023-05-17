from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.validators import MinLengthValidator
from django.db import models


class User(AbstractUser):
    """Модель User.
       Позволяет при создании запрашивать емейл и юзернейм.
    """

    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        verbose_name='Логин',
        max_length=25,
        unique=True,
        blank=False,
        validators=[username_validator],
    )
    email = models.EmailField(
        verbose_name='Электронная почта',
        unique=True,
    )
    password = models.CharField(
        verbose_name='Пароль',
        max_length=150
    )
    first_name = models.CharField(
        verbose_name='Имя',
        max_length=50,
        blank=True,
        validators=[MinLengthValidator(2)],
    )
    last_name = models.CharField(
        verbose_name='Фамилия',
        max_length=50,
        blank=True,
        validators=[MinLengthValidator(2)],
    )
    avatar = models.ImageField(
        upload_to='static/users',
        verbose_name='Изображение',
        blank=True,
        null=True,
    )
    # balance = models.ImageField(
    #     default=0
    # )

    def __str__(self):
        return self.username
