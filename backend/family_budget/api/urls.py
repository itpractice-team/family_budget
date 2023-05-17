from django.urls import include, path
from rest_framework.routers import DefaultRouter


app_name = 'api'

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
    path('', include('djoser.urls')),
    path(r'^auth/', include('djoser.urls')),
]