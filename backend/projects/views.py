from django.shortcuts import render
from django.http import JsonResponse
from .models import Project

def all_projects(request):
    projects = list(Project.objects.values())
    return JsonResponse(projects, safe=False)

