from django.urls import include, path
from rest_framework import routers
from djoser.views import UserViewSet

from .views import CategoryIncomeViewSet, IncomeViewSet, MoneyBoxViewSet

app_name = 'api'

router_v1 = routers.DefaultRouter()
router_v1.register('users', UserViewSet, basename='users')
router_v1.register('moneybox', MoneyBoxViewSet, basename='moneyboxs')
router_v1.register('income', IncomeViewSet, basename='incomes')
router_v1.register(
    'categoryincome', CategoryIncomeViewSet, basename='category_incomes'
)

urlpatterns = [
    path('', include(router_v1.urls)),
    # path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]
