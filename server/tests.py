import unittest 
from flask_testing import TestCase 
import json

from api import app, db, routes
from user.dao import User

class MyTest(TestCase):
    def create_app(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://trackpack:@localhost/trackpack_testing"
        db.init_app(app)
        return app

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

class ApiTest(MyTest):
    def test_creat_user(self):
        response = self.client.post('/users', 
                                    data=json.dumps(dict(email='test', password='test', username='test')),
                                    content_type='application/json')

        self.assertEquals(response.json['message'],'Success!')
        self.assertEquals(response.json['user'], dict(active=False,email='test', password=response.json['user']['password'], username='test', user_id=response.json['user']['user_id']))

    def test_get_all_users(self):
        data = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**data).create()

        response = self.client.get("/users")
        self.assertEquals(response.json, dict(message='Success!', users=[dict(active=False,email='test',password='test',user_id=response.json['users'][0]['user_id'],username='test')]) )

    def test_get_user_by_username(self):
        data1 = {'email':'test1', 'password':'test', 'username': 'user1'}
        user1 = User(**data1).create()

        data2 = {'email':'test2', 'password':'test', 'username': 'user2'}
        user2 = User(**data2).create()

        response = self.client.get('/users/username/user1')
        self.assertEquals(response.json['message'],'Success!')
        self.assertEquals(response.json['user'], dict(active=False,email='test1', password=response.json['user']['password'], username='user1', user_id=response.json['user']['user_id']))

        response = self.client.get('/users/username/user2')
        self.assertEquals(response.json['message'],'Success!')
        self.assertEquals(response.json['user'], dict(active=False,email='test2', password=response.json['user']['password'], username='user2', user_id=response.json['user']['user_id']))

    def test_get_user_by_email(self):
        data1 = {'email':'test1', 'password':'test', 'username': 'user1'}
        user1 = User(**data1).create()

        data2 = {'email':'test2', 'password':'test', 'username': 'user2'}
        user2 = User(**data2).create()

        response = self.client.get('/users/email/test1')
        self.assertEquals(response.json['message'],'Success!')
        self.assertEquals(response.json['user'], dict(active=False,email='test1', password=response.json['user']['password'], username='user1', user_id=response.json['user']['user_id']))

        response = self.client.get('/users/email/test2')
        self.assertEquals(response.json['message'],'Success!')
        self.assertEquals(response.json['user'], dict(active=False,email='test2', password=response.json['user']['password'], username='user2', user_id=response.json['user']['user_id']))

    def test_login(self):
        self.client.post('/users', 
                        data=json.dumps(dict(email='test', password='test', username='test')), 
                        content_type='application/json')

        response = self.client.post('/login',
                                    data=json.dumps(dict(email='test',password='test')),
                                    content_type='application/json')

        self.assertEquals(response.json, dict(access_token=response.json['access_token']))


if __name__ == '__main__':
    unittest.main()