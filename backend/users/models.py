from django.contrib.auth.models import AbstractUser, UserManager
from django.core.validators import EmailValidator, MinLengthValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from users.validators import UnicodeUsernameValidator, validate_simple_name


class CustomUserManager(UserManager):
    def get_by_natural_key(self, username):
        username_field = "{}__iexact".format(self.model.USERNAME_FIELD)
        return self.get(**{username_field: username})


class User(AbstractUser):
    """Модель пользователей."""

    objects = CustomUserManager()

    username = models.CharField(
        _("username"),
        max_length=25,
        unique=True,
        help_text=_(
            "Required. 2-25 characters. Letters(a-z), digits and ./+/-/_ only."
        ),
        validators=[UnicodeUsernameValidator(), MinLengthValidator(2)],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    email = models.EmailField(
        _("email"),
        max_length=129,
        unique=True,
        validators=[EmailValidator, MinLengthValidator(7)],
    )
    first_name = models.CharField(
        _("first name"),
        max_length=50,
        blank=True,
        validators=[validate_simple_name],
    )
    last_name = models.CharField(
        _("last name"),
        max_length=50,
        blank=True,
        validators=[validate_simple_name],
    )
    avatar = models.ImageField(
        _("avatar"),
        blank=True,
        upload_to="users",
    )

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self):
        return self.username
