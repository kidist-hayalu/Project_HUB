from django.shortcuts import render
from django.http import JsonResponse
from .models import Project
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_projects(request):
    projects = list(Project.objects.values())
    return JsonResponse(projects, safe=False)

