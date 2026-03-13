from django.shortcuts import render
from django.http import JsonResponse
from .models import Message

def messages(request):
    return JsonResponse(list(Message.objects.values()), safe=False)
