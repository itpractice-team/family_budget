from backend.family_budget import settings


class TestSettings:
    def test_settings(self):
        db_engine = settings.DATABASES["default"]["ENGINE"]
        assert not settings.DEBUG, "Проверьте, что DEBUG в настройках Django выключен"
        assert (
            db_engine == "django.db.backends.postgresql"
        ), "Проверьте, что используете базу данных postgresql"
