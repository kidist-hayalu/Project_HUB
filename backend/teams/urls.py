from django.urls import path
from .views import all_teams

urlpatterns = [
    path('', all_teams)
]
