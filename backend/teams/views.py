from django.shortcuts import render
from django.http import JsonResponse
from .models import Team

def all_teams(request):
    teams = []

    for team in Team.objects.prefetch_related("members"):
        teams.append({
            "name": team.name,
            "members": list(team.members.values())
        })

    return JsonResponse(teams, safe=False)

