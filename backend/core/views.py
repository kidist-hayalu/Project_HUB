from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
import json

@api_view(['GET'])
def test_api(request):
    return Response({"message": "Django + React are connected"})

def homepage_data(request):
    return JsonResponse({
        "projects": 12,
        "teams": 4,
        "reports": 8
    })

@csrf_exempt
def login_view(request):
    data = json.loads(request.body)
    user = authenticate(
        username=data["username"],
        password=data["password"]
    )

    if user:
        return JsonResponse({"status": "success"})
    return JsonResponse({"status": "failed"}, status=401)


