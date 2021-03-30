import unittest 
from flask_testing import TestCase

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
    def test_some_json(self):
        data = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**data).create()

        response = self.client.get("/users")
        self.assertEquals(response.json, dict(message='Success!', users=[dict(active=False,email='test',password='test',user_id=response.json['users'][0]['user_id'],username='test')]) )

if __name__ == '__main__':
    unittest.main()