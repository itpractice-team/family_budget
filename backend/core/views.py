from django.http import JsonResponse
from django.utils.translation import gettext_lazy as _
from rest_framework import status


def error_400(request, exception):
    """Обработка 400 ошибки для на стороне пользователя."""
    message = _("Bad request (400)")
    response = JsonResponse(
        data={"message": message, "status_code": status.HTTP_400_BAD_REQUEST}
    )
    response.status_code = status.HTTP_400_BAD_REQUEST
    return response


def error_404(request, exception):
    """Обработка 404 ошибки для не найденного ресурса."""
    message = _("The resource can not be found (404)")
    response = JsonResponse(
        data={"message": message, "status_code": status.HTTP_404_NOT_FOUND}
    )
    response.status_code = status.HTTP_404_NOT_FOUND
    return response


def error_500(request):
    """Обработка 500 ошибки для внутренней ошибки на сервере."""
    message = _("Server error (500)")
    response = JsonResponse(
        data={"message": message, "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR}
    )
    response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    return response
