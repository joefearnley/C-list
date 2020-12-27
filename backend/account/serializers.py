from django.contrib.auth.models import User, Group
from rest_framework import serializers
from items.serializers import ItemSerializer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    items = ItemSerializer(many=True, read_only=False)

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'items']


class GroupSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Group
        fields = ['url', 'name']


class AccountSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField(required=True,)
    password = serializers.CharField(required=True, write_only=True,)
    confirm_password = serializers.CharField(required=True,)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']
