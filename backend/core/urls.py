from django.urls import path
from .views import test_api
from .views import test_api, homepage_data, login_view

urlpatterns = [
    path('test/', test_api),
    path('homepage/', homepage_data),
    path('login/', login_view),
]