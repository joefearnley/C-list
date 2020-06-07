# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone
from django.db import models
from django.conf import settings

class Item(models.Model):
    title = models.CharField(max_length=250)
    content = models.TextField(blank=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    due_date = models.DateField()

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return self.title
