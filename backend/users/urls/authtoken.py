from django.urls import re_path

from users import views

urlpatterns = [
    re_path(
        r"^token/login/?$", views.CustomTokenCreateView.as_view(), name="login"
    ),
    re_path(
        r"^token/logout/?$",
        views.CustomTokenDestroyView.as_view(),
        name="logout",
    ),
]
