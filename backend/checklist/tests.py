# -*- coding: utf-8 -*-
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class AuthenticateTest(APITestCase):
    def setUp(self):
        self.username = 'joe'
        self.password = 'secret'
        self.email = 'joetest123@gmail.com'

        self.user = User.objects.create(
            username=self.username, 
            email=self.email,
            is_active=True
        )

        self.user.set_password(self.password)
        self.user.save()

    def test_invalid_credentials_does_not_return_token(self):
        post_data = {
            'username': self.username,
            'password': 'test1234'
        }

        response = self.client.post('/api/v1/token-auth/', data=post_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['non_field_errors'][0], 'Unable to log in with provided credentials.')

    def test_token_auth_returns_token(self):
        post_data = {
            'username': self.username,
            'password': self.password
        }

        response = self.client.post('/api/v1/token-auth/', data=post_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(response.data.get('token'), None)

    def test_can_register_user():
        # given a username, email,
        pass
