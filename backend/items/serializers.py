from django.contrib.auth.models import User, Group
from items.models import Item
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    items = serializers.StringRelatedField(many=True, read_only=False)

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'items']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class ItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Item
        fields = ['title', 'description', 'user', 'due_date', 'created', 'updated']