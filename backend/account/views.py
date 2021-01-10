from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, GroupSerializer, AccountSerializer
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated,]

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.pk)

    def get_permissions(self):
        # When using any action besides create, users should be authenticated
        if self.action == 'create':
            self.permission_classes = [AllowAny,]

        return super(AccountViewSet, self).get_permissions()
