from django.db.models.fields.files import ImageField

from core.forms import ImageAndSvgFormsField


class ImageAndSvgField(ImageField):
    def formfield(self, **kwargs):
        return super().formfield(
            **{
                "form_class": ImageAndSvgFormsField,
                **kwargs,
            }
        )
