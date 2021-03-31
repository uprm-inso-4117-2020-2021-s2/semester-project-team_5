import unittest 
from unittest.mock import Mock
from flask_testing import TestCase 
import json

from api import app, db, routes, verify_parameters, to_dict
from user.dao import User

class TestClient(TestCase):
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

class UtilsTest(TestClient):
    def test_verify_parameters(self):
        params = {'email', 'username', 'password'}
        data = {'email':'testemail', 'username':'tester', 'password':'testing'}
        valid_params = verify_parameters(data, params)
        assert valid_params == data

        params = {'email', 'username', 'password'}
        data = {'username':'tester', 'password':'testing'}
        valid_params = verify_parameters(data, params)
        assert valid_params == None

class UserDAOTest(TestClient):
    def test_create_user(self):
        data = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**data).create()
        assert user.username == 'test'
        assert user.email == 'test'

    def test_get_all_users(self):
        data1 = {'email':'test', 'password':'test', 'username': 'test'}
        user1 = User(**data1).create()
        data2 = {'email':'test2', 'password':'test2', 'username': 'test2'}
        user2 = User(**data2).create()
        data3 = {'email':'test3', 'password':'test3', 'username': 'test3'}
        user3 = User(**data3).create()
        users = User.getAllUsers()
        assert len(users) == 3
        assert users[0] == user1
        assert users[1] == user2
        assert users[2] == user3

    def test_get_user_by_id(self):
        data = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**data).create()
        result = User.getUserById(user.user_id)
        assert user == result

    def test_get_by_email(self):
        data = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**data).create()
        result = User.getUserByEmail(user.email)
        assert user == result

    def test_get_user_by_username(self):
        data = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**data).create()
        result = User.getUserByUsername(user.username)
        assert user == result

class ApiTest(TestClient):
    def test_creat_user(self):
        response = self.client.post('/users', 
                                    data=json.dumps(dict(email='test', password='test', username='test')),
                                    content_type='application/json')

        assert response.json['message'] == 'Success!'
        assert response.json['user']['active'] == False
        assert response.json['user']['email'] == 'test'
        assert response.json['user']['username'] == 'test'

    def test_fail_create_user(self):
        data = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**data).create()

        response = self.client.post('/users', 
                                    data=json.dumps(dict(email='test', password='test', username='test')),
                                    content_type='application/json')
        assert response.json == {'message':'Email already taken. Please use another one.'}

        response = self.client.post('/users', 
                                    data=json.dumps(dict(password='test2', username='test2')),
                                    content_type='application/json')
        assert response.json == {'message':'Bad Request!'}

    def test_get_all_users(self):
        data = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**data).create()

        response = self.client.get("/users")
        response_user = response.json['users'][0]

        assert response.json['message'] == 'Success!'
        assert response_user['active'] == False
        assert response_user['email'] == 'test'
        assert response_user['username'] == 'test'

    def test_get_user_by_username(self):
        data1 = {'email':'test1', 'password':'test', 'username': 'user1'}
        user1 = User(**data1).create()

        data2 = {'email':'test2', 'password':'test', 'username': 'user2'}
        user2 = User(**data2).create()

        response = self.client.get('/users/username/user1')
        assert response.json['message'] == 'Success!'
        assert response.json['user']['active'] == False
        assert response.json['user']['email'] == 'test1'
        assert response.json['user']['username'] == 'user1'

        response = self.client.get('/users/username/user2')
        assert response.json['message'] == 'Success!'
        assert response.json['user']['active'] == False
        assert response.json['user']['email'] == 'test2'
        assert response.json['user']['username'] == 'user2'

    def test_fail_user_by_username(self):
        response = self.client.get('/users/username/user1')
        assert response.json == {'reason':'User does not exist.'}

    def test_get_user_by_email(self):
        data1 = {'email':'test1', 'password':'test', 'username': 'user1'}
        user1 = User(**data1).create()

        data2 = {'email':'test2', 'password':'test', 'username': 'user2'}
        user2 = User(**data2).create()

        response = self.client.get('/users/email/test1')
        assert response.json['message'] == 'Success!'
        assert response.json['user']['active'] == False
        assert response.json['user']['email'] == 'test1'
        assert response.json['user']['username'] == 'user1'

        response = self.client.get('/users/email/test2')
        assert response.json['message'] == 'Success!'
        assert response.json['user']['active'] == False
        assert response.json['user']['email'] == 'test2'
        assert response.json['user']['username'] == 'user2'

    def test_fail_get_user_by_email(self):
        response = self.client.get('/users/email/test1')
        assert response.json == {'reason':'User does not exist.'}


    def test_login(self):
        self.client.post('/users', 
                        data=json.dumps(dict(email='test', password='test', username='test')), 
                        content_type='application/json')

        response = self.client.post('/login',
                                    data=json.dumps(dict(email='test',password='test')),
                                    content_type='application/json')

        assert response.json == dict(access_token=response.json['access_token'])

    def test_fail_login(self):
        self.client.post('/users', 
                        data=json.dumps(dict(email='test', password='test', username='test')), 
                        content_type='application/json')

        response = self.client.post('/login',
                                    data=json.dumps(dict(email='bad_email',password='bad_password')),
                                    content_type='application/json')
        assert response.json == {'Error':'email or password incorrect'}

        response = self.client.post('/login',
                                    data=json.dumps(dict(password='bad_password')),
                                    content_type='application/json')
        assert response.json == {'Error':'Malformed body'}

if __name__ == '__main__':
    unittest.main()