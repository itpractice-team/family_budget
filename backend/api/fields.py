from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import OpenApiTypes, extend_schema_field
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


@extend_schema_field(OpenApiTypes.INT)
class LookupBugetRelatedField(serializers.RelatedField):
    """Lookup поле бюджета."""

    default_error_messages = {
        "does_not_exist": _(
            "Object with {lookup_name}={value} does not exist."
        ),
        "invalid": _("Invalid value."),
    }

    def __init__(
        self, budget=CurrentBudgetDefault(), lookup_field=None, **kwargs
    ):
        assert (
            lookup_field is not None
        ), "The `lookup_field` argument is required."
        self.budget = budget
        self.lookup_field = lookup_field
        super().__init__(**kwargs)

    def get_budget(self):
        if callable(self.budget):
            if getattr(self.budget, "requires_context", False):
                return self.budget(self)
            else:
                return self.budget()
        return self.budget

    def to_internal_value(self, data):
        queryset = self.get_queryset()
        try:
            budget = self.get_budget()
            return queryset.get(
                **{"budget": budget.pk, self.lookup_field: data}
            )
        except ObjectDoesNotExist:
            self.fail(
                "does_not_exist", lookup_name=self.lookup_field, value=data
            )
        except (TypeError, ValueError):
            self.fail("invalid")

    def to_representation(self, obj):
        return getattr(obj, self.lookup_field).pk
