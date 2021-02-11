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

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
