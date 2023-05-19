from django.urls import include, path
from rest_framework import routers
from djoser.views import UserViewSet

app_name = "api"

router_v1 = routers.DefaultRouter()
router_v1.register("", UserViewSet, basename="users")

urlpatterns = [
    path("users/", include(router_v1.urls)),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
]
