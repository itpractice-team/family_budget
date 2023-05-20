import json

from django.core.management import BaseCommand

from recipes import models

EMPTY_ARGS_MESSAGE = '"--{arg}" argument was not provided'
UNKNOW_MODEL_MESSAGE = "Unknow model {model} was provided"


class Command(BaseCommand):
    """
    Команда для импорта данных из json-файла в записи моделей Django.
    Имеет два обязатлеьных параметра:
    --path - полный путь до json-файла
    --model - имя модели, в которую импортируем данные

    Пример вызова:
    python manage.py import_json --path '/Dev/test.json' --model Ingredient
    При таком вызове произойдет запись данных в модель Ingredient.
    """

    help = "Load data from a json file into Django model records. "

    def add_arguments(self, parser):
        parser.add_argument("--path", type=str)
        parser.add_argument("--model", type=str)

    def handle(self, *args, **kwargs):
        path = kwargs.get("path")
        if not path:
            raise KeyError(EMPTY_ARGS_MESSAGE.format(arg="path"))
        model_name = kwargs.get("model")
        if not model_name:
            raise KeyError(EMPTY_ARGS_MESSAGE.format(arg="model"))
        import_model = getattr(models, model_name, None)
        if not import_model:
            raise KeyError(EMPTY_ARGS_MESSAGE.format(arg="model"))
        with open(path, "r", encoding="utf-8") as json_file:
            json_data = json.load(json_file)
        objects = [import_model(**data) for data in json_data]
        import_model.objects.bulk_create(objects)
