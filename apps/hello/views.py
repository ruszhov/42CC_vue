from django.shortcuts import render, HttpResponse
from rest_framework.permissions import IsAuthenticated, \
    AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.authtoken.models import Token
from apps.hello.models import Contact, HttpRequestLog
import json
from apps.hello.serializers import ContactSerializer, HttpRequestLogSerializer

login_url = '/login/'


class ContactViewSet(ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class HttpRequestLogSet(ModelViewSet):
    queryset = HttpRequestLog.objects.all().order_by('-date')[:10]
    serializer_class = HttpRequestLogSerializer
    permission_classes = [AllowAny]


class GetUserView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = Token.objects.get(key=request.auth).user.username
        content = {'username': user}
        return Response(content)


def get_requests(request):
    response_data = {'total': HttpRequestLog.objects.count()}
    return HttpResponse(json.dumps(response_data),
                        content_type='application/json')


def admin_url(request):
    contact = Contact.objects.all()[0]
    url = '/admin/%s/%s/%s/' % (
        contact._meta.app_label, contact._meta.model_name, contact.id)
    return HttpResponse(json.dumps({'adminUrl': url}))


def base_app(request):
    return render(request, 'base.html')
