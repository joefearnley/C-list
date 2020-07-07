# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone
from django.contrib.auth.models import User
from django.db import models
from django.conf import settings

class Item(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True)
    complete = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="items")
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    due_date = models.DateField()

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return self.title
