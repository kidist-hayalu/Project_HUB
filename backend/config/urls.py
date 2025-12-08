from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/teams/', include('teams.urls')),
    path('api/reports/', include('reports.urls')),
    path('api/chat/', include('chat.urls')),
]
