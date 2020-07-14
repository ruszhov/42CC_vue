import json
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.test import TestCase, Client
from django.core.urlresolvers import reverse
from .models import Contact, HttpRequestLog, ModelActionLog
from .serializers import ContactSerializer, HttpRequestLogSerializer
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory, APITestCase
from rest_framework.status import (HTTP_200_OK,
                                   HTTP_404_NOT_FOUND,
                                   HTTP_201_CREATED,
                                   HTTP_400_BAD_REQUEST,
                                   HTTP_204_NO_CONTENT)

import datetime


class GetAllContactsTest(APITestCase):
    ''' Test module for GET all/single contacts API '''
    def setUp(self):
        Contact.objects.create(
            first_name='Ruslan',
            last_name='Zhovniriv',
            date_of_birth='1987-07-15',
            bio='Developer, Full Stack developper',
            email='ruszhov@gmail.com',
            skype='ruszhov',
            jabber='ruszhov@42.cc.co'
        )
        Contact.objects.create(
            first_name='Max',
            last_name='Ivanov',
            date_of_birth='1989-02-19',
            bio='DevOps',
            email='ivanov@gmail.com',
            skype='maxiv',
            jabber='maxiv@42.cc.co'
        )

    def test_get_all_contacts(self):
        """Getting all contact entries"""
        # get API response
        url = '/api/contacts/'
        response = self.client.get(url)
        # get data from db
        contacts = Contact.objects.all()
        context = {'request': Request(APIRequestFactory().get(url))}
        serializer = ContactSerializer(contacts, many=True, context=context)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, HTTP_200_OK)

    def test_get_valid_single_contact(self):
        """Getting valid single Contact entry"""
        url = '/api/contacts/1/'
        response = self.client.get(url)
        contact = Contact.objects.get(pk=1)
        context = {'request': Request(APIRequestFactory().get(url))}
        serializer = ContactSerializer(contact, context=context)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, HTTP_200_OK)


class CreateNewContactTest(APITestCase):
    """ Test module for inserting a new contact """
    def setUp(self):
        self.valid_payload = {
            'first_name': 'Ruslan',
            'last_name': 'Zhovniriv',
            'date_of_birth': '1987-07-15',
            'bio': 'Developer, Full Stack developper',
            'email': 'ruszhov@gmail.com',
            'skype': 'ruszhov',
            'jabber': 'ruszhov@42.cc.co',
            'photo': None
        }
        self.invalid_payload = {
            'first_name': '',
            'last_name': '',
            'date_of_birth': '1987-07-15',
            'bio': 'Developer, Full Stack developper',
            'email': 'ruszhov@gmail.com',
            'skype': 'ruszhov',
            'jabber': 'ruszhov@42.cc.co'
        }
        self.username = "john"
        self.email = "john@snow.com"
        self.password = "you_know_nothing"
        self.user = User.objects.create_user(
            self.username, self.email, self.password)
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_create_valid_contact(self):
        """Creating valid Contact entry"""
        response = self.client.post('/api/contacts/',
                                    data=json.dumps(self.valid_payload),
                                    content_type='application/json')
        self.assertEqual(response.status_code, HTTP_201_CREATED)

    def test_create_invalid_contact(self):
        """Creating invalid Contact entry"""
        response = self.client.post('/api/contacts/',
                                    data=json.dumps(self.invalid_payload),
                                    content_type='application/json')
        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST)


class UpdateSingleContactTest(APITestCase):
    """ Test module for updating an existing contact record """

    def setUp(self):
        self.contact = Contact.objects.create(
            first_name='Ruslan',
            last_name='Zhovniriv',
            date_of_birth='1987-07-15',
            bio='Developer, Full Stack developper',
            email='ruszhov@gmail.com',
            skype='ruszhov',
            jabber='ruszhov@42.cc.co'
        )
        self.valid_payload = {
            'first_name': 'Ruslan',
            'last_name': 'Zhovniriv',
            'date_of_birth': '1987-07-15',
            'bio': 'Developer, Full Stack developper',
            'email': 'ruszhov@gmail.com',
            'skype': 'ruszhov',
            'jabber': 'ruszhov@42.cc.co',
            'photo': None
        }
        self.invalid_payload = {
            'first_name': '',
            'last_name': '',
            'date_of_birth': '1987-07-15',
            'bio': 'Developer, Full Stack developper',
            'email': 'ruszhov@gmail.com',
            'skype': 'ruszhov',
            'jabber': 'ruszhov@42.cc.co'
        }

        self.username = "john"
        self.email = "john@snow.com"
        self.password = "you_know_nothing"
        self.user = User.objects.create_user(
            self.username, self.email, self.password)
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_valid_update_contact(self):
        """Testtin updating valid Contact entry"""
        response = self.client.put('/api/contacts/1/', data=json.dumps(
            self.valid_payload), content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_contact(self):
        """Testtin updating invalid Contact entry"""
        response = self.client.put('/api/contacts/1/', data=json.dumps(
            self.invalid_payload), content_type='application/json')
        self.assertEqual(response.status_code, HTTP_400_BAD_REQUEST)


class DeleteSingleContactTest(APITestCase):
    """ Test module for deleting an existing contact record """
    def setUp(self):
        self.contact = Contact.objects.create(
            first_name='Ruslan',
            last_name='Zhovniriv',
            date_of_birth='1987-07-15',
            bio='Developer, Full Stack developper',
            email='ruszhov@gmail.com',
            skype='ruszhov',
            jabber='ruszhov@42.cc.co'
        )
        self.username = "john"
        self.email = "john@snow.com"
        self.password = "you_know_nothing"
        self.user = User.objects.create_user(
            self.username, self.email, self.password)
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_valid_delete_contact(self):
        """Testing deleting valid Contact entry"""
        response = self.client.delete('/api/contacts/1/')
        self.assertEqual(response.status_code, HTTP_204_NO_CONTENT)

    def test_invalid_delete_contact(self):
        """Testing deleting invalid Contact entry"""
        response = self.client.delete('/api/contacts/30/')
        self.assertEqual(response.status_code, HTTP_404_NOT_FOUND)


class GetHttpRequestsTest(APITestCase):
    ''' Test module for GET all/ten requests API '''
    def setUp(cls):
        HttpRequestLog.objects.create(
            id=1,
            date=datetime.datetime.now(),
            request_method='GET',
            url='/http_requests/',
            server_protocol='HTTP/1.1'
        )

    def test_get_all_requests(self):
        """Getting all HttpRequests entries"""
        # get API response
        url = '/api/http_requests/'
        response = self.client.get(url)
        # get data from db
        requests = HttpRequestLog.objects.all().order_by('-date')
        context = {'request': Request(APIRequestFactory().get(url))}
        serializer = HttpRequestLogSerializer(
            requests, many=True, context=context)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, HTTP_200_OK)

    def test_create_entries(self):
        """
        create 10 entries, check if items are created (getting latest id),
        check if returns 10 items
        create 5 more, check if items are created (getting latest id),
        check if returns 10 newest
        """

        def create_record(id):
            HttpRequestLog.objects.create(
                id=id,
                date=datetime.datetime.now(),
                request_method='GET',
                url='/api/http_requests/',
                server_protocol='HTTP/1.1'
            )

        for i in range(2, 12):
            create_record(i)

        url = '/api/http_requests/'
        # makes one more item itself
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        items = HttpRequestLog.objects.all().order_by('-date')[:10]
        count_items = items.count()
        latest_pk_after_create_records = HttpRequestLog.objects.latest('id')

        self.assertEquals(count_items, 10)
        self.assertEquals(latest_pk_after_create_records.id, 12)

        url = '/api/http_requests/'
        response = self.client.get(url)
        # get data from db
        requests = HttpRequestLog.objects.all().order_by('-date')[:10]
        context = {'request': Request(APIRequestFactory().get(url))}
        serializer = HttpRequestLogSerializer(
            requests, many=True, context=context)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, HTTP_200_OK)

        # create 5 new items
        for i in range(14, 19):
            create_record(i)

        more_items = HttpRequestLog.objects.all().order_by('-date')[:10]
        url = '/api/http_requests/'
        response = self.client.get(url)
        latest_pk_after_adding_five_more_records = \
            HttpRequestLog.objects.latest('id')
        self.assertEquals(latest_pk_after_adding_five_more_records.id,
                          latest_pk_after_create_records.id + 7)
        serializer = HttpRequestLogSerializer(
            more_items, many=True, context=context)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, HTTP_200_OK)


class GetUserViewTest(APITestCase):
    """ Test module for getting an existing user record """

    def setUp(self):
        self.username = "john"
        self.email = "john@admin.com"
        self.password = "some_pass"
        self.user = User.objects.create_user(
            self.username, self.email, self.password)
        self.token = Token.objects.create(user=self.user)
        self.api_authentication()

    def api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_get_username(self):
        """GetUserView.get() sets 'name' in response context."""
        # Setup name.
        user = self.token.user.username
        # Setup request and view.
        request = self.client.get('/get_user/')
        self.assertEqual(request.status_code, 200)
        self.assertEqual(self.username, user)


class GetTotalRequestsNmb(TestCase):
    """ Test module for total number of requests """

    def setUp(cls):
        HttpRequestLog.objects.create(
            id=1,
            date=datetime.datetime.now(),
            request_method='GET',
            url='/http_requests/',
            server_protocol='HTTP/1.1'
        )

    def test_create_entries(self):
        """
        create 10 entries, return total number of them
        """

        def create_record(id):
            HttpRequestLog.objects.create(
                id=id,
                date=datetime.datetime.now(),
                request_method='GET',
                url='/api/http_requests/',
                server_protocol='HTTP/1.1'
            )

        for i in range(2, 12):
            create_record(i)

        url = '/get_requests/'
        # makes one more item itself
        response = self.client.get(url)
        total_nmb = HttpRequestLog.objects.count()
        json_response = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'application/json')
        self.assertEqual(json_response['total'], total_nmb)


class AuditLoggerTest(TestCase):
    def setUp(self):
        self._log_entry = {
            'model_name': 'User',
            'instance': 'admin',
            'action': 'update',
            'created': datetime.datetime.now()
        }

        self._contact = {
            'first_name': 'Ruslan',
            'last_name': 'Zhovniriv',
            'date_of_birth': '1987-07-15',
            'bio': 'Developer, Full Stack',
            'email': 'ruszhov@gmail.com',
            'skype': 'ruszhov',
            'jabber': 'ruszhov@42.cc.co',
            'other_contacts': 'https://www.linkedin.com/in/ruszhov/',
        }

    def test_max_length(self):
        """check max length of ModelActionLog's fields"""
        logentry = ModelActionLog.objects.all().first()
        max_length_model_name = logentry._meta.get_field('model_name')\
            .max_length
        max_length_instance = logentry._meta.get_field('instance').max_length
        max_length_action = logentry._meta.get_field('action').max_length
        self.assertEquals(max_length_model_name, 64)
        self.assertEquals(max_length_instance, 64)
        self.assertEquals(max_length_action, 16)

    def test_object_create(self):
        """Checking post_save signal, 'create' action"""
        count = ModelActionLog.objects.count()
        contact = Contact.objects.create(**self._contact)
        new_count = ModelActionLog.objects.count()
        self.assertEqual(count + 1, new_count)

        log_entry = ModelActionLog.objects.latest('created')
        self.assertNotEquals(log_entry, None)
        self.assertEquals(log_entry.model_name, contact._meta.object_name)
        self.assertEquals(log_entry.instance, unicode(contact))
        self.assertEquals(log_entry.action, unicode('create'))

    def test_object_update(self):
        """Checking post_save signal, 'update' action"""
        count = ModelActionLog.objects.count()

        contact = Contact.objects.get()
        contact.jabber = 'ruszhov@42.cc.co'
        contact.save()

        new_count = ModelActionLog.objects.count()
        self.assertEqual(count + 1, new_count)

        log_entry = ModelActionLog.objects.latest('created')
        self.assertNotEquals(log_entry, None)
        self.assertEquals(log_entry.model_name, contact._meta.object_name)
        self.assertEquals(log_entry.instance, unicode(contact))
        self.assertEquals(log_entry.action, unicode('update'))

    def test_object_delete(self):
        """Checking post_delete signal"""
        count = ModelActionLog.objects.count()

        contact = Contact.objects.get()
        contact.delete()

        new_count = ModelActionLog.objects.count()
        self.assertEqual(count + 1, new_count)

        log_entry = ModelActionLog.objects.latest('created')
        self.assertNotEquals(log_entry, None)
        self.assertEquals(log_entry.model_name, contact._meta.object_name)
        self.assertEquals(log_entry.instance, unicode(contact))
        self.assertEquals(log_entry.action, unicode('delete'))


class TestPage(TestCase):
    """Testing base page"""
    def setUp(self):
        self.client = Client()

    def test_index_page(self):
        """checking index page, template"""
        url = reverse('base')
        response = self.client.get(url)
        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertTemplateUsed(response, 'base.html')
