from .models import Item
from rest_framework import serializers


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = [
            'pk', 'title', 'description', 'complete', 'due_date', 
            'created', 'updated', 'user'
        ]
        read_only_fields = ['user']
