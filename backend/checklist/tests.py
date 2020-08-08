# -*- coding: utf-8 -*-
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework.test import RequestsClient
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from items.models import Item
import datetime

class ItemListTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.username = 'joe'
        self.password = 'secret'
        self.user = User.objects.create(username=self.username, password=self.password)

        due_date = datetime.datetime.now() + datetime.timedelta(weeks=3)
        Item.objects.create(title='Clean Pool', description='Clean the Pool', user=self.user, due_date=due_date)
        Item.objects.create(title='Clean Bathroom', description='Clean the Bathroom', user=self.user, due_date=due_date)

    def test_cannot_view_checklist_if_not_logged_in(self):
        response = self.client.get('/api/v1/checklist/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_can_view_checklist_if_not_logged_in(self):
#        token = Token.objects.get(username='joe')
        login_response = self.client.post('/rest-auth/login/', {
            'username': self.username,
            'password': self.password
        })

        self.assertEqual(login_response.status_code, status.HTTP_200_OK)

        # # self.client.force_authenticate(user=self.user)
        # self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        # response = self.client.get('/api/v1/checklist/')
        # assert response.status_code == 200
