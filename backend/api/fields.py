from django.http import Http404
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


class PrimaryKey404RelatedField(serializers.PrimaryKeyRelatedField):
    """Класс первичного ключа с обработкой ошибки 404."""

    def to_internal_value(self, data):
        try:
            return super().to_internal_value(data)
        except ValidationError as exc:
            if "does_not_exist" in exc.get_codes():
                raise Http404(_("Object not found"))
        except (TypeError, ValueError):
            self.fail("incorrect_type", data_type=type(data))


class CurrentBudgetDefault:
    requires_context = True

    def __call__(self, serializer_field):
        return serializer_field.context["request"].user.budgets.first()

    def __repr__(self):
        return "%s()" % self.__class__.__name__
