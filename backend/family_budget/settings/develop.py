import mimetypes
import os
import socket

from .base import *  # noqa

DEBUG = True

ALLOWED_HOSTS += os.getenv("DEVELOP_HOSTS", "backend").split(",")

CORS_ALLOWED_ORIGINS = CSRF_TRUSTED_ORIGINS = list(
    map(lambda url: f"http://{url}", ALLOWED_HOSTS)
)

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
