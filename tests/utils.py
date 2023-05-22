from rest_framework import serializers, status

VALID_METHODS = ("get", "head", "options", "patch", "post", "put", "delete")


def get_response_data(client, method, url, **kwargs):
    """Возвращает результат запроса к эндпоинту."""
    method = method.lower()
    assert (
        method in VALID_METHODS
    ), f"Указан неизвестный метод для запроса {method}!"
    params = kwargs.get("params")
    data = kwargs.get("data")
    request_method = getattr(client, method)
    return request_method(url, data=data, params=params, format="json")


def get_fields_serializer(serializer):
    """Возвращает список с наименованиями полей сариалайзера."""
    return list(
        (
            serializer.child
            if isinstance(serializer, serializers.ListSerializer)
            else serializer
        )
        .get_fields()
        .keys()
    )


def check_with_validate_data(client, method, url, **kwargs):
    """Тест-кейс с валидными данными."""
    response_serializer = kwargs.get("serializer")
    code = kwargs.get("code", status.HTTP_200_OK)
    pagination = kwargs.get("pagination")
    db_check_action = kwargs.get("db_check_action")
    response = get_response_data(client, method, url, **kwargs)
    assert (
        response.status_code != status.HTTP_404_NOT_FOUND
    ), f"Эндпоинт `{url}` не найден, проверьте этот адрес в *urls.py*"
    assert response.status_code == code, (
        f"Убедитесь, что при запросе `{url}` с валидными данными, "
        f"возвращается код {code}"
    )
    if pagination:
        test_data = response.json()
        assert type(test_data) == dict, (
            f"Проверьте, что при GET запросе на `{url}` "
            "с пагинацией, возвращается словарь"
        )
        assert "results" in test_data.keys(), (
            f"Убедитесь, что при GET запросе на `{url}` "
            "с пагинацией, ключ `results` присутствует в ответе"
        )
        response.data = response.data["results"]
    if response_serializer and issubclass(
        response_serializer, serializers.BaseSerializer
    ):
        serializer = response_serializer(data=response.data)
        fields_name = get_fields_serializer(serializer)
        assert serializer.is_valid(), (
            f"Убедитесь, что при запросе `{url}` с валидными данными, "
            f" в ответе возвращается код {code} с ключами:{fields_name}. "
            f"Ошибка валидации: {serializer.errors}"
        )
    if db_check_action:
        pass
    return response.data if hasattr(response, "data") else response


def check_bad_request(client, method, url, **kwargs):
    """Тест-кейс с ошибочными данными."""
    response_serializer = kwargs.get("serializer")
    code = kwargs.get("code", status.HTTP_400_BAD_REQUEST)
    db_check_action = kwargs.get("db_check_action")
    response = get_response_data(client, method, url, **kwargs)
    assert response.status_code == code, (
        f"Убедитесь, что при запросе `{url}` без параметров, "
        f"возвращается код {code}"
    )
    assert response.data["error"] is not None, (
        f"Убедитесь, что при запросе `{url}` без параметров, "
        "возвращается детализация ошибке в `error`"
    )
    error_detail = response.data["error"]
    if (
        error_detail
        and response_serializer
        and issubclass(response_serializer, serializers.BaseSerializer)
    ):
        fields_invalid = get_fields_serializer(response_serializer())
        for field in fields_invalid:
            assert field in error_detail.keys(), (
                f"Убедитесь, что при запросе `{url}` без параметров, "
                f"возвращается код {code} с сообщением о том, "
                "при обработке каких полей возникла ошибка."
                f"Не найдено поле {field}"
            )
    if db_check_action:
        pass
    return response.data


def check_not_authorized(client, method, url, **kwargs):
    """Тест-кейс с отсутствием авторизации."""
    code = kwargs.get("code", status.HTTP_401_UNAUTHORIZED)
    db_check_action = kwargs.get("db_check_action")
    response = get_response_data(client, method, url, **kwargs)
    assert response.status_code == code, (
        f"Убедитесь, что при запросе `{url}` "
        "без предоставления учетных данных, "
        f"возвращается код {code}"
    )
    if db_check_action:
        pass
    return response.data
