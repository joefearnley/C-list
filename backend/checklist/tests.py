# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.test import TestCase
from rest_framework.test import RequestsClient

client = RequestsClient()
response = client.get('http://localhost:8000')
assert response.status_code == 404