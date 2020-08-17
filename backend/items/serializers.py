from django.contrib.auth.models import User, Group
from items.models import Item
from rest_framework import serializers, fields

class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['title', 'description', 'complete', 'due_date', 'created', 'updated', 'user']
        read_only_fields = ['user']

    # def create(self, validated_data):
    #     item = Item.objects.create(
    #         title=validated_data['username'],
    #         description=validated_data['description'],
    #         due_date=validated_data['due_date']
    #     )

    #     item.save()

    #     return item

class UserSerializer(serializers.HyperlinkedModelSerializer):
    items = ItemSerializer(many=True, read_only=False)

    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups', 'items']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
