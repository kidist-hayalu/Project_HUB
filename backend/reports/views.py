from django.shortcuts import render
from django.http import JsonResponse
from .models import Report

def reports(request):
    return JsonResponse(list(Report.objects.values()), safe=False)

