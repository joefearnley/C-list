from django.test import TestCase
from rest_framework import status


class AccountTest(TestCase):

    def test_can_create_account(self):
        post_data = {
            'username': 'jo3F123',
            'email': 'jo3F123@gmail.com',
            'password': 'secret123',
            'confirm_password': 'secret123'
        }

        response = self.client.post('/api/v1/account/', data=post_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], post_data['username'])
        self.assertEqual(response.data['email'], post_data['email'])
