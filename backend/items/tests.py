from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import Item
import datetime


class ItemListTest(APITestCase):
    def setUp(self):
        self.default_user = User.objects.create(
            username='joe',
            email='joetest123@gmail.com',
            is_active=True
        )

        self.default_user.set_password('secret')
        self.default_user.save()

        self.token = Token.objects.create(user=self.default_user)
        self.token.save()

        self.default_due_date = datetime.datetime.now() + datetime.timedelta(weeks=1)

        Item.objects.create(
            title='Clean Pool',
            description='Clean the Pool',
            user=self.default_user,
            due_date=self.default_due_date
        )

        Item.objects.create(
            title='Clean Bathroom',
            description='Clean the Bathroom',
            user=self.default_user,
            due_date=self.default_due_date
        )

        self.items = Item.objects.all()

    def test_cannot_view_itemlist_if_not_authorized(self):
        response = self.client.get('/api/v1/items/')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_can_view_itemlist_if_authorized(self):
        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.get('/api/v1/items/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_can_only_view_items_user_owns(self):
        temp_user = User.objects.create(
            username='john',
            email='jdoe123@gmail.com',
            is_active=True
        )

        item = Item.objects.create(
            title='Clean Garage',
            description='Clean the Garage',
            user=temp_user,
        )

        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.get('/api/v1/items/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_cannot_add_item_when_not_authenticated(self):
        post_data = {
            'title': 'Clean Garage',
            'description': 'Please clean the garage',
        }

        response = self.client.post('/api/v1/items/', data=post_data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_can_add_item(self):
        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        post_data = {
            'title': 'Clean Garage',
            'description': 'Please clean the garage',
            'due_date': ''
        }

        response = self.client.post('/api/v1/items/', data=post_data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_cannot_read_item_when_not_authenticated(self):
        item = Item.objects.get(title="Clean Pool")

        response = self.client.get('/api/v1/items/%s/' % str(item.pk))

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_cannot_read_item_when_not_authorized(self):
        temp_user = User.objects.create(
            username='john',
            email='jdoe123@gmail.com',
            is_active=True
        )

        temp_user_token = Token.objects.create(user=temp_user)
        temp_user_token.save()

        item = Item.objects.get(title="Clean Pool")

        self.client.force_authenticate(user=temp_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + temp_user_token.key)
        response = self.client.get('/api/v1/items/%s/' % str(item.pk))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get('/api/v1/items/%s/' % str(item.pk))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_can_read_item(self):
        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        item = Item.objects.create(
            title='Clean Garage',
            description='Clean the Garage',
            user=self.default_user
        )

        response = self.client.get('/api/v1/items/%s/' % str(item.pk))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('title'), 'Clean Garage')
        self.assertEqual(response.data.get('description'), 'Clean the Garage')

    def test_cannot_update_item_when_not_authenticated(self):
        item = Item.objects.get(title='Clean Pool')
        patch_data = {
            'title': 'Clean Pool Now!',
            'description': 'Please clean the pool and clean it now!',
        }

        response = self.client.patch('/api/v1/items/%s/' % str(item.pk), data=patch_data)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_cannot_update_item_when_not_authorized(self):
        temp_user = User.objects.create(
            username='john',
            email='jdoe123@gmail.com',
            is_active=True
        )

        temp_user_token = Token.objects.create(user=temp_user)
        temp_user_token.save()

        item = Item.objects.get(title='Clean Pool')
        patch_data = {
            'title': 'Clean Pool Now!',
            'description': 'Please clean the pool and clean it now!',
        }

        self.client.force_authenticate(user=temp_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + temp_user_token.key)

        response = self.client.patch('/api/v1/items/%s/' % str(item.pk), data=patch_data)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_can_update_item(self):
        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        item = Item.objects.get(title='Clean Pool')
        patch_data = {
            'title': 'Clean Pool Now!',
            'description': 'Please clean the pool and clean it now!',
        }

        response = self.client.patch('/api/v1/items/%s/' % str(item.pk), data=patch_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('title'), 'Clean Pool Now!')
        self.assertEqual(response.data.get('description'), 'Please clean the pool and clean it now!')

    def test_can_complete_item(self):
        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        item = Item.objects.get(title='Clean Pool')
        patch_data = {
            'complete': True
        }

        response = self.client.patch('/api/v1/items/%s/' % str(item.pk), data=patch_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        updated_item = Item.objects.get(title='Clean Pool')
        self.assertEqual(updated_item.complete, True)

    def test_can_uncomplete_item(self):
        item = Item.objects.create(
            title='Wash Feet',
            description='Wash yo Feet',
            user=self.default_user,
            complete=True
        )

        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        patch_data = {
            'complete': False
        }

        response = self.client.patch('/api/v1/items/%s/' % str(item.pk), data=patch_data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        updated_item = Item.objects.get(title='Wash Feet')
        self.assertEqual(updated_item.complete, False)

    def test_cannot_delete_item_when_not_authenticated(self):
        item = Item.objects.create(
            title='Clean Car',
            description='Clean the Car',
            user=self.default_user,
        )

        response = self.client.delete('/api/v1/items/%s/' % str(item.pk))

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_cannot_delete_item_when_not_authorized(self):
        temp_user = User.objects.create(
            username='john',
            email='jdoe123@gmail.com',
            is_active=True
        )

        temp_user_token = Token.objects.create(user=temp_user)
        temp_user_token.save()

        item = Item.objects.create(
            title='Clean Car',
            description='Clean the Car',
            user=self.default_user,
        )

        self.client.force_authenticate(user=temp_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + temp_user_token.key)

        response = self.client.delete('/api/v1/items/%s/' % str(item.pk))

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_can_delete_item(self):
        item = Item.objects.create(
            title='Clean Car',
            description='Clean the Car',
            user=self.default_user,
        )

        items = Item.objects.all()
        self.assertEqual(len(items), 3)

        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.delete('/api/v1/items/%s/' % str(item.pk))

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        items = Item.objects.all()
        self.assertEqual(len(items), 2)


class UpcomingItemListTest(ItemListTest):
    def setUp(self):
        super(UpcomingItemListTest, self).setUp()

    def test_can_read_upcoming_list(self):
        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        # We already have two "upcoming" items created during setup. We'll create
        # another one with no due date to ensure it doesn't return it along with the others
        Item.objects.create(
            title='Clean Bike',
            user=self.default_user
        )

        response = self.client.get('/api/v1/items/upcoming/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_cannot_read_upcoming_list_for_another_user(self):
        temp_user = User.objects.create(
            username='john',
            email='jdoe123@gmail.com',
            is_active=True
        )

        temp_user_item = Item.objects.create(
            title='Clean Garage',
            user=temp_user,
            due_date=self.default_due_date
        )

        temp_user_item = Item.objects.create(
            title='Clean Fridge',
            user=temp_user,
            due_date=self.default_due_date
        )

        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.get('/api/v1/items/upcoming/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_no_upcoming_items_show_when_nothing_is_upcoming(self):
        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        # clear all items first
        Item.objects.all().delete()

        a_week_ago = datetime.datetime.now() - datetime.timedelta(weeks=1)

        Item.objects.create(
            title='Clean Pool',
            user=self.default_user,
            due_date=a_week_ago
        )

        Item.objects.create(
            title='Clean Bathroom',
            user=self.default_user,
            due_date=a_week_ago
        )

        Item.objects.create(
            title='Clean Bike',
            user=self.default_user
        )

        response = self.client.get('/api/v1/items/upcoming/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_no_upcoming_items_are_completed(self):
        self.client.force_authenticate(user=self.default_user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        # clear all items first
        Item.objects.all().delete()

        Item.objects.create(title='Clean Pool',user=self.default_user)
        Item.objects.create(title='Clean Bathroom',user=self.default_user)
        Item.objects.create(title='Clean Bike',user=self.default_user)

        response = self.client.get('/api/v1/items/upcoming/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
