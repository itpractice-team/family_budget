import os

from django.conf import settings


class TestRequirements:
    def test_requirements(self):
        try:
            with open(f'{os.path.join(settings.BASE_DIR, "requirements.txt")}', "r") as f:
                requirements = f.read()
        except FileNotFoundError:
            assert False, "Проверьте, что добавили файл requirements.txt"

        pip_package = (
            "django",
            "djangorestframework",
            "djoser",
            "gunicorn",
            "pillow",
            "pytest-django",
            "psycopg2-binary",
            "python-dotenv",
        )
        for package_name in pip_package:
            assert package_name in requirements, f"Проверьте, что добавили {package_name} " "в файл requirements.txt"
