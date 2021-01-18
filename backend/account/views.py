from django.contrib.auth.models import User, Group
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, GroupSerializer, AccountSerializer
from rest_framework.response import Response
from rest_framework.decorators import action


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


    @action(methods=['post'], detail=True, url_path='change-password', url_name='change_password')
    def update_password(self, request, pk=None):
        user = request.user

        if request.data['password'] == '' or request.data['confirm_password'] == '' :
            return Response({
                'password': ['Please provide a password and password confirmation.']},
                status=status.HTTP_400_BAD_REQUEST
            )

        if request.data['password'] != request.data['confirm_password'] :
            return Response({
                'password': ['Password and Password Confirmation do not match.']},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(request.data['password'])
        user.save()

        return Response({
            'message': ['Password changed successfully.']}, 
            status=status.HTTP_200_OK
        )
