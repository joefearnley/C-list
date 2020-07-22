from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from items import views
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/checklist', views.UserItemList.as_view(), name='UserItemList'),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls'))
]

