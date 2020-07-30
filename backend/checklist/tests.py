# -*- coding: utf-8 -*-
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework.test import RequestsClient
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from items.models import Item

class ItemListTest(APITestCase):
    def setUp(self):
        pass

    def test_cannot_view_checklist_if_not_logged_in(self):
        client = APIClient()
        response = client.get('/api/v1/checklist/')
        assert response.status_code == 401

    def test_can_view_checklist_if_not_logged_in(self):
        token = Token.objects.get(user__username='joe')

        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        response = client.get('/api/v1/checklist/')
        assert response.status_code == 200
