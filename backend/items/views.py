from django.contrib.auth.models import User, Group
from items.models import Item
from rest_framework import generics, viewsets, status, permissions
from items.serializers import UserSerializer, GroupSerializer, ItemSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
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

    # def list(self, request):
    #     queryset = self.get_queryset().filter(user=request.user)
    #     serializer = ItemSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def perform_create(self, serializer):
    #     # print('asfasdfsfd')
    #     print(self.request.user)
    #     serializer.save(user=self.request.user)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)

    def create(self, request):  
        # serializer = self.serializer_class(data=request.data)
        # request.data['user'] = request.user.id
        
        # serializer.is_valid(raise_exception=True)

        # serializer.save()
        
        # if serializer.is_valid():
        #     serializer.save()
        # return Response(serializer.data, status=status.HTTP_201_CREATED)

        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # return Response({})

        # item = Item(user=request.user)

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


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