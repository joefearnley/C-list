from django.contrib.auth.models import User, Group
from items.models import Item
from rest_framework import viewsets
from items.serializers import UserSerializer, GroupSerializer, ItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework import generics

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('-created')
    serializer_class = ItemSerializer

    # def list(self, request):
    #     queryset = self.get_queryset().filter(user=request.user)
    #     serializer = ItemSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def create(self, request):
    #     pass

    # def retrieve(self, request, pk=None):
    #     return Response({
    #         'id': pk
    #     })

    # def update(self, request, pk=None):
    #     pass

    # def partial_update(self, request, pk=None):
    #     pass

    # def destroy(self, request, pk=None):
    #     pass

class UserCheckList(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def list(self, request):
        queryset = self.get_queryset().filter(user=request.user).order_by('-created')
        serializer = ItemSerializer(queryset, many=True)
        return Response(serializer.data)

    def get(self, request):
        return Response({'getting': True})

    def post(self, request):
        return Response({'posting': True})

    def patch(self, request):
        return Response({'patching': True})

    def delete(self, request):
        return Response({'deleting': True})