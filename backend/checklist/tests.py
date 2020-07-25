# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.test import TestCase, Client
from rest_framework.test import RequestsClient
from django.contrib.auth.models import User
from ..models import Item



class ItemListTest(Api):
    
    def setUp(self):
        
