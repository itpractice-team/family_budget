import os

from corsheaders.defaults import default_headers

from .base import *  # noqa

DEBUG = False

ALLOWED_HOSTS += os.getenv("PRODUCTION_HOSTS", "backend").split(",")

CORS_ALLOW_ALL_ORIGINS = True

CSRF_TRUSTED_ORIGINS = list(map(lambda url: f"https://{url}", ALLOWED_HOSTS))

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True

SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_PRELOAD = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
