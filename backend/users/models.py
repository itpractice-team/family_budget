from django.contrib.auth.models import AbstractUser
from django.core.validators import EmailValidator, MinLengthValidator
from django.db import models


class User(AbstractUser):
    """Модель User. Позволяет при создании запрашивать емейл и юзернейм."""

    email = models.EmailField(
        verbose_name="Электронная почта",
        max_length=129,
        unique=True,
        validators=[EmailValidator, MinLengthValidator],
    )
    avatar = models.ImageField(
        upload_to="users",
        verbose_name="Изображение",
        blank=True,
    )

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return self.username
