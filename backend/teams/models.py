from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=100)

class Member(models.Model):
    team = models.ForeignKey(Team, related_name="members", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50)

