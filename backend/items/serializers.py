from django.contrib.auth.models import User, Group
from items.models import Item
from rest_framework import serializers

class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = ['title', 'description', 'complete', 'due_date', 'created', 'updated', 'user']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    items = ItemSerializer(many=True, read_only=False)

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'items']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
