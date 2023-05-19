import http

from rest_framework.views import exception_handler


def core_exception_handler(exc, context):
    """Обработчик ошибок REST framework."""
    handlers = {
        "ValidationError": _handle_validation_error,
        "Http404": _handle_http404_error,
        "PermissionDenied": _handle_denied_error,
        "NotAuthenticated": _handle_not_authenticated_error,
    }
    response = exception_handler(exc, context)
    if response is not None:
        response_payload = {
            "error": response.data,
            "message": str(response.data),
            "status_code": response.status_code,
            "reason": http.client.responses.get(response.status_code),
            "view_name": context["view"].__class__.__name__,
            "view_desc": context["view"].__class__.__doc__,
        }
        response.data = response_payload
    exception_class = exc.__class__.__name__
    if exception_class in handlers:
        return handlers[exception_class](exc, context, response)
    return response


def _handle_validation_error(exc, context, response):
    """Обработка ошибок валидации."""
    return response


def _handle_http404_error(exc, context, response):
    """Обработка ошибок отсутсвия ресурса."""
    return response


def _handle_denied_error(exc, context, response):
    """Обработка ошибок доступа."""
    return response


def _handle_not_authenticated_error(exc, context, response):
    """Обработка ошибок аутентификации."""
    return response
