import datetime
from rest_framework import serializers
from apps.hello.models import Contact, HttpRequestLog, ModelActionLog


class ContactSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.SerializerMethodField()
    age = serializers.SerializerMethodField()

    class Meta:
        model = Contact
        fields = ['id', 'first_name', 'last_name', 'date_of_birth',
                  'age', 'email', 'skype', 'jabber',
                  'other_contacts', 'bio', 'photo']

    def get_id(self, obj):
        return obj.pk

    def get_age(self, obj):
        return int((datetime.date.today() - obj.date_of_birth).days / 365.25)


class HttpRequestLogSerializer(serializers.HyperlinkedModelSerializer):
    total_count = serializers.SerializerMethodField()

    class Meta:
        model = HttpRequestLog
        fields = ['id', 'priority', 'date', 'request_method', 'url',
                  'server_protocol', 'total_count']

    def get_total_count(self, obj):
        return HttpRequestLog.objects.count()


class ModelActionLogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ModelActionLog
