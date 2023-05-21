[![Python](https://img.shields.io/badge/-Python-464646?style=flat-square&logo=Python)](https://www.python.org/)
[![Django](https://img.shields.io/badge/-Django-464646?style=flat-square&logo=Django)](https://www.djangoproject.com/)
[![Django REST Framework](https://img.shields.io/badge/-Django%20REST%20Framework-464646?style=flat-square&logo=Django%20REST%20Framework)](https://www.django-rest-framework.org/)
[![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-464646?style=flat-square&logo=PostgreSQL)](https://www.postgresql.org/)
[![Nginx](https://img.shields.io/badge/-NGINX-464646?style=flat-square&logo=NGINX)](https://nginx.org/ru/)
[![gunicorn](https://img.shields.io/badge/-gunicorn-464646?style=flat-square&logo=gunicorn)](https://gunicorn.org/)
[![docker](https://img.shields.io/badge/-Docker-464646?style=flat-square&logo=docker)](https://www.docker.com/)
[![Production workflow](https://github.com/AcceleratorYandexPracticum/family_budget/actions/workflows/main.yaml/badge.svg)](https://github.com/AcceleratorYandexPracticum/family_budget/actions/workflows/main.yaml)
[![Test workflow](https://github.com/AcceleratorYandexPracticum/family_budget/actions/workflows/develop.yaml/badge.svg)](https://github.com/AcceleratorYandexPracticum/family_budget/actions/workflows/develop.yaml)

## Описание проекта:
Контроль расходов - семейный бюджет

## Подготовка окружения для разработки

### Предварительные требования:
1. **Poetry** \
Зависимости и пакеты управляются через **poetry**. Убедитесь, что **poetry** [установлен](https://python-poetry.org/docs/#osx--linux--bashonwindows-install-instructions) на вашем компьютере и ознакомьтесь с [документацией](https://python-poetry.org/docs/cli/).
```
- Устанавливаем Poetry версия 1.4.0
    curl -sSL https://install.python-poetry.org | python - --version 1.4.0
- Добавляем Poetry в переменную среды ОС PATH
    "$HOME/.local/bin" для Unix.
    "%APPDATA%\Python\Scripts" для Windows.
```
2. **Docker**
3. Файлы **requirements** \
Файлы редактировать вручную не нужно. Обновление происходит автоматически через pre-commit хуки.
4. **pre-commit хуки** \
[Документация](https://pre-commit.com)\
При каждом коммите выполняются хуки перечисленные в **.pre-commit-config.yaml**.
Если при коммите возникает ошибка, можно запустить хуки вручную:
    ```
    pre-commit run --all-files
    ```

### Запуск проекта:
1. Клонировать репозиторий и перейти в него в командной строке:
    ```
    git clone git@github.com:AcceleratorYandexPracticum/family_budget.git
    cd family_budget
    ```
2. Убедитесь что poetry установлен. Активируйте виртуальное окружение. Установите зависимости
    ```
    poetry shell
    poetry install
    ```
3. Сделайте миграции
    ```
    python manage.py migrate
    ```
4. Установите pre-commit хуки
    ```
    pre-commit install --all
    ```
5. Убедитесь, что при запуске используется правильное виртуальное окружение.
Посмотреть путь можно следующей командой:
    ```
    poetry env info --path
    ```

### Создание Docker контейнеров:
Перейти в директорию infra:
```
cd infra
```

Создать файл .env с переменными окружения для работы с базой данных PostgreSQL:

```
# Доменное имя
ALLOWED_HOSTS=example.org
# Указываем, что работаем с postgresql
DB_ENGINE=django.db.backends.postgresql
# Имя базы данных
DB_NAME=fb
# Логин для подключения к базе данных
POSTGRES_USER=postgres
# Пароль для подключения к БД (установите свой)
POSTGRES_PASSWORD=postgres
# Название сервиса (контейнера)
DB_HOST=db
# Порт для подключения к БД
DB_PORT=5432
```
Указываем DNS имя сервиса вместо example.org и свой адрес электронной почты:

```
- в файле init-letsencrypt.sh;
- в файле data/nginx/app.conf
```

Создаем и запускаем сервисы приложения:

```
docker-compose up
```

Создать базу данных:
```
docker exec -it {имя контейнера БД} /bin/bash
psql -U postgres -c 'create database fb;'
```

Выполнить миграции:

```
docker-compose exec backend python manage.py migrate
```

Создаем суперпользователя:

```
docker-compose exec backend python manage.py createsuperuser
```

Собираем статику проекта:

```
docker-compose exec backend python manage.py collectstatic --no-input
```
