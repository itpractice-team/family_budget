from django.urls import path
from djoser.views import UserViewSet

urlpatterns = [
    path("", UserViewSet.as_view({"post": "create"}), name="users"),
    path(
        "<int:id>/", UserViewSet.as_view({"get": "retrieve"}), name="user-info"
    ),
    path(
        "me/",
        UserViewSet.as_view(
            {"get": "me", "put": "me", "patch": "me", "delete": "me"}
        ),
        name="user-me",
    ),
    path(
        "set_password/",
        UserViewSet.as_view({"post": "set_password"}),
        name="user-set-password",
    ),
]
