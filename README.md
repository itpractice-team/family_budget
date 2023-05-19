[![Python](https://img.shields.io/badge/-Python-464646?style=flat-square&logo=Python)](https://www.python.org/)
[![Django](https://img.shields.io/badge/-Django-464646?style=flat-square&logo=Django)](https://www.djangoproject.com/)
[![Django REST Framework](https://img.shields.io/badge/-Django%20REST%20Framework-464646?style=flat-square&logo=Django%20REST%20Framework)](https://www.django-rest-framework.org/)
[![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-464646?style=flat-square&logo=PostgreSQL)](https://www.postgresql.org/)
[![Nginx](https://img.shields.io/badge/-NGINX-464646?style=flat-square&logo=NGINX)](https://nginx.org/ru/)
[![gunicorn](https://img.shields.io/badge/-gunicorn-464646?style=flat-square&logo=gunicorn)](https://gunicorn.org/)
[![docker](https://img.shields.io/badge/-Docker-464646?style=flat-square&logo=docker)](https://www.docker.com/)
![Foodgram workflow](https://github.com/AcceleratorYandexPracticum/family_budget/actions/workflows/family_budget_workflow.yml/badge.svg?event=push)
### Описание проекта:
Контроль расходов - семейный бюджет

### Запуск проекта:

Клонировать репозиторий и перейти в него в командной строке:

```
git clone git@github.com:AcceleratorYandexPracticum/family_budget.git
```

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
