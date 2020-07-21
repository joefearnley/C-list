from django.contrib.auth.models import User, Group
from items.models import Item
from rest_framework import viewsets
from items.serializers import UserSerializer, GroupSerializer, ItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('-created')
    serializer_class = ItemSerializer

class UserItemListView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    # serializer_class = ItemSerializer

    def get(self, request, format=None):
        items = Item.objects.filter(user=request.user).order_by('-created')
        # serializer = UserSerializer(data=request.user)
        return Response({"items": items})
