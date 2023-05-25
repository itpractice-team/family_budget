import mimetypes
import os
import socket

from .base import *  # noqa

DEBUG = True

ALLOWED_HOSTS = os.getenv("DEVELOP_HOSTS").split(",")

CORS_ALLOWED_ORIGINS = ["127.0.0.1", "localhost",]

CSRF_TRUSTED_ORIGINS = ["127.0.0.1", "localhost",]

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
]

INSTALLED_APPS += [
    "debug_toolbar",
]

hostname, _, ips = socket.gethostbyname_ex(socket.gethostname())

INTERNAL_IPS = [ip[: ip.rfind(".")] + ".1" for ip in ips] + [
    "127.0.0.1",
    "10.0.2.2",
]

mimetypes.add_type("application/javascript", ".js", True)

DEBUG_TOOLBAR_CONFIG = {
    "INTERCEPT_REDIRECTS": False,
}
