from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from items import views as item_views
from account import views as account_views

router = routers.DefaultRouter()
router.register(r'users', account_views.UserViewSet)
router.register(r'groups', account_views.GroupViewSet)
router.register(r'items', item_views.ItemViewSet)
router.register(r'account', account_views.AccountViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/token-auth/', obtain_auth_token, name='token_auth'),
]
