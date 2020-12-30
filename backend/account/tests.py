from django.test import TestCase
from rest_framework import status


class AccountTest(TestCase):

    def test_cannot_create_account_when_username_not_provided(self):
        post_data = {
            'username': '',
            'email': 'jo3F123@gmail.com',
            'password': 'secret123',
        }

        response = self.client.post('/api/v1/account/', data=post_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data.get('username')[0],
            'This field may not be blank.'
        )

    def test_cannot_create_account_when_email_not_provided(self):
        post_data = {
            'username': 'jo3F123',
            'email': '',
            'password': 'secret123',
        }

        response = self.client.post('/api/v1/account/', data=post_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data.get('email')[0],
            'This field may not be blank.'
        )

    def test_cannot_create_account_when_email_not_valid(self):
        post_data = {
            'username': 'jo3F123',
            'email': 'joeffoefijo',
            'password': 'secret123',
        }

        response = self.client.post('/api/v1/account/', data=post_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data.get('email')[0],
            'Enter a valid email address.'
        )

    def test_cannot_create_account_when_password_not_provided(self):
        post_data = {
            'username': 'jo3F123',
            'email': 'jo3F123@gmail.com',
            'password': '',
        }

        response = self.client.post('/api/v1/account/', data=post_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data.get('password')[0],
            'This field may not be blank.'
        )

    def test_can_create_account(self):
        post_data = {
            'username': 'jo3F123',
            'email': 'jo3F123@gmail.com',
            'password': 'secret123',
        }

        response = self.client.post('/api/v1/account/', data=post_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], post_data['username'])
        self.assertEqual(response.data['email'], post_data['email'])
