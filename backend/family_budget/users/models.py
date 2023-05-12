from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Модель User.
       Позволяет при создании запрашивать емейл и юзернейм.
    """

    email = models.EmailField(
        verbose_name='Электронная почта',
        max_length=254,
        unique=True,
    )
    username = models.CharField(
        verbose_name='Логин',
        max_length=150,
        unique=True,
        blank=False
    )
    password = models.CharField(
        verbose_name='Пароль',
        max_length=150
    )
    first_name = models.CharField(
        verbose_name='Имя',
        max_length=150,
        blank=True
    )
    last_name = models.CharField(
        verbose_name='Фамилия',
        max_length=150,
        blank=True
    )
    avatar = models.ImageField(
        upload_to='static/users',
        verbose_name='Изображение',
        blank=True,
#        default='static/users/avatar-photo.jpg'
    )

    def __str__(self):
        return self.username
