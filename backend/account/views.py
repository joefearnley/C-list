from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, GroupSerializer, AccountSerializer
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class AccountViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = AccountSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.pk)
