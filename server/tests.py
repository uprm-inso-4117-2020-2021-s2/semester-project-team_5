import unittest 
from unittest.mock import Mock
from flask_testing import TestCase 
import json

from api import app, db, routes, verify_parameters, to_dict
from user.dao import User
from category.dao import Category
from package.dao import Package

class TestClient(TestCase):
    def create_app(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://trackpack:trackpack_testing@localhost/trackpack_testing"
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
        data = {'email':'test', 'password':'test', 'username': 'test', 'active': True}
        user = User(**data).create()
        assert user.username == 'test'
        assert user.email == 'test'
        assert user.active == True

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

    def test_activate_user(self):
        data = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**data).create()
        user.activateUser()
        assert user.active == True

class CategoryDAOTest(TestClient):
    def test_create_category(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()
        assert category.name == 'test_category'

    def test_get_all_categories(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category1'}
        category1 = Category(**categoryData).create()
        categoryData = {'user_id': user.user_id, 'name':'test_category2'}
        category2 = Category(**categoryData).create()
        categoryData = {'user_id': user.user_id, 'name':'test_category3'}
        category3 = Category(**categoryData).create()
        categories = Category.getAllCategories()
        assert categories[0] == category1
        assert categories[1] == category2
        assert categories[2] == category3

    def test_get_category_by_id(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()
        result_category = Category.getCategoryById(category.category_id)
        assert result_category == category

    def test_get_category_by_user_id_and_name(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()
        result_category = Category.getCategoryByUserIdAndName(user.user_id,category.name)
        assert result_category == category

    def test_get_category_by_user_id(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()
        result_categories = Category.getCategoriesByUserId(user.user_id)
        assert result_categories[0] == category

    def test_get_package_by_tracking_number_and_userId(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        packageData = {'carrier': 'ups', 'tracking_number':'122833234', 'name':'test', 'creation_date':'21-04-2021', 'category_id':category.category_id}
        package = Package(**packageData).create()
        result_category= Category.getPackageByTrackingNumberAndUserId('122833234',str(user.user_id))
        assert result_category[0].category_id== category.category_id

class PackageDAOTest(TestClient):
    def test_create_package(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        packageData = {'carrier': 'ups', 'tracking_number':'122833234', 'name':'test', 'creation_date':'21-04-2021', 'category_id':category.category_id}
        package = Package(**packageData).create()
        assert package.carrier == 'ups'
        assert package.tracking_number == '122833234'
        assert package.name == 'test'
        assert str(package.creation_date) == '2021-04-21'
        assert package.category_id == category.category_id

    def test_get_all_packages(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        packageData = {'carrier': 'ups', 'tracking_number':'122833234', 'name':'test', 'creation_date':'21-04-2021', 'category_id':category.category_id}
        package = Package(**packageData).create()

        packageData = {'carrier': 'ups', 'tracking_number':'128332353', 'name':'test2', 'creation_date':'21-04-2021', 'category_id':category.category_id}
        package1 = Package(**packageData).create()

        packages = Package.getAllPackages()
        assert packages[0].package_id == package.package_id
        assert packages[1].package_id == package1.package_id

    def test_get_package_by_id_or_carrier(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        packageData = {'carrier': 'ups', 'tracking_number':'122833234', 'name':'test', 'creation_date':'21-04-2021', 'category_id':category.category_id}
        package = Package(**packageData).create()

        result_package = Package.getPackageById(package.package_id)
        assert result_package.package_id == package.package_id

        result_package = Package.getPackagesByCarrier('ups')
        assert result_package[0].package_id == package.package_id

    def test_get_package_by_name(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        packageData = {'carrier': 'ups', 'tracking_number':'122833234', 'name':'test', 'creation_date':'21-04-2021', 'category_id':category.category_id}
        package = Package(**packageData).create()

        result_package = Package.getPackagesByName('test')
        assert result_package[0].package_id == package.package_id

    def test_get_package_by_category(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        packageData = {'carrier': 'ups', 'tracking_number':'122833234', 'name':'test', 'creation_date':'21-04-2021', 'category_id':category.category_id}
        package = Package(**packageData).create()

        result_package = Package.getPackagesByCategory(category.category_id)
        assert result_package[0].package_id == package.package_id

    def test_get_package_by_tracking_number(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        packageData = {'carrier': 'ups', 'tracking_number':'122833234', 'name':'test', 'creation_date':'21-04-2021', 'category_id':category.category_id}
        package = Package(**packageData).create()

        result_package = Package.getPackageByTrackingNumber('122833234')
        assert result_package.package_id == package.package_id

class ApiTest(TestClient):
    def test_create_user(self):
        response = self.client.post('/users', 
                                    data=json.dumps(dict(email='test@test.com', password='test', username='test')),
                                    content_type='application/json')
        assert response.json['message'] == 'Success!'
        assert response.json['user']['active'] == False
        assert response.json['user']['email'] == 'test@test.com'
        assert response.json['user']['username'] == 'test'

    def test_fail_create_user(self):
        data = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**data).create()

        response = self.client.post('/users', 
                                    data=json.dumps(dict(email='test2', password='test', username='test')),
                                    content_type='application/json')
        assert response.json == {'message':'Username already taken. Please use another one.'}

        response = self.client.post('/users', 
                                    data=json.dumps(dict(email='test', password='test', username='test2')),
                                    content_type='application/json')
        assert response.json == {'message':'Email already taken. Please use another one.'}

        response = self.client.post('/users', 
                                    data=json.dumps(dict(email='test', password='test', username='test')),
                                    content_type='application/json')
        assert response.json == {'message':'Username and email already taken. Please use another one.'}

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
        assert response.json == {'Error':'Email or password is incorrect'}

        response = self.client.post('/login',
                                    data=json.dumps(dict(password='bad_password')),
                                    content_type='application/json')
        assert response.json == {'Error':'Malformed body'}

    def test_get_all_categories(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        response = self.client.get('/categories')
        category1 = response.json['categories'][0]
        assert response.json['message'] == 'Success!'
        assert category1['user_id'] == str(category.user_id)
        assert category1['name'] == category.name

    def test_create_category(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        response = self.client.post('/categories',
                                    data=json.dumps(dict(user_id=str(user.user_id), name='test_category')),
                                    content_type='application/json')
        assert response.json['message'] == 'Success!'
        assert response.json['category']['user_id'] == str(user.user_id)
        assert response.json['category']['name'] == 'test_category'

    def test_fail_create_category(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        response = self.client.post('/categories',
                                data=json.dumps(dict(user_id=str(user.user_id), name='test_category')),
                                content_type='application/json')

        assert response.json['message'] == 'The category you tried to create already exsists.'
    
    def test_delete_category(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        response = self.client.delete(f'/users/{user.user_id}/categories/{category.category_id}')

        assert response.json['message'] == 'Success!'
        assert response.json['category']['name'] == category.name

    def test_get_category_by_user_id(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        response = self.client.get(f'/users/{user.user_id}/categories')
        category1 = response.json['categories'][0]
        assert response.json['message'] == 'Success!'
        assert category1['user_id'] == str(category.user_id)
        assert category1['name'] == category.name

    def test_delete_category_by_user_id(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'unlisted'}
        unlisted_category = Category(**categoryData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        packageData = {'carrier':'usps', 'tracking_number':'212323123', 'name':'test', 'creation_date':'2021-02-01', 'category_id':category.category_id}
        package = Package(**packageData).create()

        response = self.client.delete(f'/users/{user.user_id}/categories/{category.category_id}')
        deleted_category = response.json['category']
        moved_packages = Package.getPackagesByCategory(unlisted_category.category_id)
        assert response.json['message'] == 'Success!'
        assert deleted_category['name'] == 'test_category'
        assert moved_packages[0].carrier == 'usps'
        assert moved_packages[0].name == 'test'

    def test_get_all_packages(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        packageData = {'carrier':'usps', 'tracking_number':'212323123', 'name':'test', 'creation_date':'2021-02-01', 'category_id':category.category_id}
        package = Package(**packageData).create()

        response = self.client.get('/packages')
        package1= response.json['packages'][0]
        assert response.json['message'] == 'Success!'
        assert package1['carrier'] == package.carrier
        assert package1['name'] == package.name
        assert package1['tracking_number'] == package.tracking_number

    def test_create_package(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        response = self.client.post('/packages',
                                    data=json.dumps(dict(carrier='usps',tracking_number='212323123',name='test',creation_date='2021-02-01', category_id=category.category_id, user_id=str(user.user_id))),
                                    content_type='application/json')
        assert response.json['message'] == 'Success!'
        assert response.json['package']['carrier'] == 'usps'
        assert response.json['package']['name'] == 'test'
        assert response.json['package']['tracking_number'] == '212323123'

    # If package has no status to be delete then it will
    def test_delete_package(self):
        userData = {'email':'test', 'password':'test', 'username': 'test'}
        user = User(**userData).create()

        categoryData = {'user_id': user.user_id, 'name':'test_category'}
        category = Category(**categoryData).create()

        packageData = {'carrier':'usps', 'tracking_number':'212323123', 'name':'test', 'creation_date':'2021-02-01', 'category_id':category.category_id}
        package = Package(**packageData).create()

        response = self.client.delete('/packages',
                                    data=json.dumps(dict(package_id=package.package_id)),
                                    content_type='application/json')

        assert response.json['message'] == 'Success!'
        assert response.json['package']['carrier'] == package.carrier
        assert response.json['package']['name'] == package.name
        assert response.json['package']['tracking_number'] == package.tracking_number


if __name__ == '__main__':
    unittest.main()
