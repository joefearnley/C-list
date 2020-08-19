from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from items import views
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'items', views.ItemViewSet)
router.register(r'logout', views.LogoutView)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/token-auth/', obtain_auth_token, name='token_auth'),
    url(r'^api/v1/logout/', views.LogoutView.as_view()),
]
