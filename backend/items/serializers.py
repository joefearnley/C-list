from django.contrib.auth.models import User, Group
from .models import Item
from rest_framework import serializers

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['pk', 'title', 'description', 'complete', 'due_date', 'created', 'updated', 'user']
        read_only_fields = ['user']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    items = ItemSerializer(many=True, read_only=False)

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'items']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
