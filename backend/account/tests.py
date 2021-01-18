from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework.authtoken.models import Token


class AccountTest(APITestCase):
    def setUp(self):
        self.username = 'joetest123@gmail.com'
        self.password = 'secret'
        self.email = 'joetest123@gmail.com'
        self.user = User.objects.create(
            username=self.username,
            email=self.email,
            is_active=True
        )

        self.user.set_password(self.password)
        self.user.save()

        self.token = Token.objects.create(user=self.user)
        self.token.save()

    def authenticate_user(self):
        self.client.force_authenticate(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)


class AccountAuthTest(AccountTest):
    def setUp(self):
        super(AccountAuthTest, self).setUp()

    def test_cannot_view_account_detail_if_not_authorized(self):
        response = self.client.get('/api/v1/account/')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_access_account_detail_that_does_not_belong_to_user(self):
        self.authenticate_user()

        response = self.client.get('/api/v1/account/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(1, len(response.data))

        user_data = response.data[0]

        self.assertEqual(user_data['username'], self.username)
        self.assertEqual(user_data['email'], self.email)

    def test_cannot_access_account_detail_that_does_not_belong_to_user(self):
        self.authenticate_user()

        user2 = User.objects.create(
            username='jdoe123@gmail.com',
            email='jdoe123@gmail.com',
            is_active=True
        )

        response = self.client.get('/api/v1/account/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(1, len(response.data))

        user_data = response.data[0]

        self.assertEqual(user_data['username'], self.username)
        self.assertEqual(user_data['email'], self.email)

        self.assertNotEqual(user_data['username'], user2.username)
        self.assertNotEqual(user_data['username'], user2.email)


class AccountCreateTest(APITestCase):
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
            'username': 'jo3F123@gmail.com',
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
            'username': 'jo3F123@gmail.com',
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
            'username': 'jo3F123@gmail.com',
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
            'username': 'jo3F123@gmail.com',
            'email': 'jo3F123@gmail.com',
            'password': 'secret123',
        }

        response = self.client.post('/api/v1/account/', data=post_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], post_data['username'])
        self.assertEqual(response.data['email'], post_data['email'])

        user_in_database = User.objects.first()

        self.assertEqual(user_in_database.username, post_data['username'])
        self.assertEqual(user_in_database.email, post_data['email'])


class AccountUpdateTest(AccountTest):
    def setUp(self):
        super(AccountUpdateTest, self).setUp()
        self.authenticate_user()

    def test_cannot_update_account_when_username_not_provided(self):
        post_data = {
            'username': '',
            'email': 'jo3F123@gmail.com',
        }

        response = self.client.patch('/api/v1/account/%s/' % str(self.user.pk), data=post_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data.get('username')[0],
            'This field may not be blank.'
        )

    def test_cannot_update_account_when_email_not_provided(self):
        post_data = {
            'username': 'jo3F123@gmail.com',
            'email': '',
        }

        response = self.client.patch('/api/v1/account/%s/' % str(self.user.pk), data=post_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data.get('email')[0],
            'This field may not be blank.'
        )

    def test_can_update_email_address(self):
        post_data = {
            'username': 'jo3F123@gmail.com',
            'email': 'jo3F123@gmail.com',
        }

        response = self.client.patch('/api/v1/account/%s/' % str(self.user.pk), data=post_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.user.refresh_from_db()
        self.assertEqual(self.user.username, post_data['username'])
        self.assertEqual(self.user.email, post_data['email'])


class AccountChangePasswordTest(AccountTest):
    def setUp(self):
        super(AccountChangePasswordTest, self).setUp()
        self.authenticate_user()

    def test_can_change_password(self):
        new_password = 'secret123'

        post_data = {
            'password': new_password,
            'confirm_password': new_password,
        }

        response = self.client.post('/api/v1/account/%s/change-password/' % str(self.user.pk), data=post_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data.get('message')[0],
            'Password changed successfully.'
        )

        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password(new_password))

    def test_cannot_change_password_when_password_not_provided(self):
        new_password = 'secret123'

        post_data = {
            'password': new_password,
            'confirm_password': '',
        }

        response = self.client.post('/api/v1/account/%s/change-password/' % str(self.user.pk), data=post_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data.get('password')[0],
            'Please provide a password and password confirmation.'
        )

    def test_cannot_change_password_when_password_confirmation_not_provided(self):
        new_password = 'secret123'

        post_data = {
            'password': '',
            'confirm_password': new_password,
        }

        response = self.client.post('/api/v1/account/%s/change-password/' % str(self.user.pk), data=post_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data.get('password')[0],
            'Please provide a password and password confirmation.'
        )

    def test_cannot_change_password_when_password_and_password_confirmation_do_not_match(self):
        new_password = 'secret123'

        post_data = {
            'password': new_password,
            'confirm_password': 'secret12345',
        }

        response = self.client.post('/api/v1/account/%s/change-password/' % str(self.user.pk), data=post_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data.get('password')[0],
            'Password and Password Confirmation do not match.'
        )
