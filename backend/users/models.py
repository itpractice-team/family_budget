from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Модель User.
    Позволяет при создании запрашивать емейл и юзернейм.
    """

    email = models.EmailField(
        verbose_name="Электронная почта",
        max_length=150,
        unique=True,
    )
    avatar = models.ImageField(
        upload_to="static/users",
        verbose_name="Изображение",
        blank=True,
    )

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return self.username
