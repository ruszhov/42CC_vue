from django.conf.urls import url
from apps.hello import views
from apps.hello.views import GetUserView

urlpatterns = [
    url(r'^$', views.base_app, name='base'),
    url(r'^get_requests/$', views.get_requests, name='get_requests'),
    url(r'^admin_url/$', views.admin_url, name='admin_url'),
    url(r'^get_user/', GetUserView.as_view())
]
