from flask import json, request, url_for, redirect, jsonify
from flask_mail import Message
from user.handler import UserHandler
from category.handler import CategoryHandler
from package.handler import PackageHandler
from package_status.handler import PackageStatusHandler
from api import app, HttpStatus

@app.route('/', methods=['GET'])
def hello_world():
    return "Hello World!"

@app.route("/users", methods=['GET', 'POST'])
def get_all_users_or_create():
    if request.method == 'GET':
        return UserHandler.getAllUsers()
    elif request.method == 'POST':
        '''
        This is only done for testing
        Gatling sends a byte string 
        So we need to decode it and load
        as JSON.
        '''
        if request.data:
            my_data = request.data
            decoded_data = my_data.decode('utf8').replace("'",'"')
            newly_decoded_data = json.loads(decoded_data)
            return UserHandler.createUser(newly_decoded_data)

        return UserHandler.createUser(request.json)

@app.route("/categories", methods=['GET', 'POST'])
def get_all_categories_or_create():
    if request.method == 'GET':
        return CategoryHandler.getAllCategories()
    elif request.method == 'POST':
        return CategoryHandler.createCategory(request.json)

@app.route("/users/<string:user_id>/categories", methods=['GET'])
def get_categories_by_user_id(user_id):
    if request.method == 'GET':
        return CategoryHandler.getCategoriesByUserId(user_id)

@app.route("/packages", methods=['GET', 'POST', 'DELETE'])
def get_all_packages_or_create():
    if request.method == 'GET':
        return PackageHandler.getAllPackages()
    elif request.method == 'POST':
        return PackageHandler.createPackage(request.json)
    elif request.method == 'DELETE':
        return PackageHandler.deletePackage(request.json)

@app.route("/users/categories/<int:category_id>/packages", methods=['GET'])
def get_packages_by_category_id(category_id):
    return PackageHandler.getPackagesByCategory(category_id)

@app.route("/packages-statuses", methods=['GET', 'POST', 'DELETE'])
def get_all_statuses_or_create():
    if request.method == 'GET':
        return PackageStatusHandler.getAllStatuses()
    elif request.method == 'POST':
        return PackageStatusHandler.createStatus(request.json)
    elif request.method == 'DELETE':
        return PackageStatusHandler.deleteStatus(request.json)

@app.route("/packages/<int:package_id>/packages-statuses", methods=['GET'])
def get_statuses_by_package_id(package_id):
    if request.method == 'GET':
        return PackageStatusHandler.getStatusesByPackageId(package_id)

@app.route('/account-activation', methods=['POST'])
def activation_request():
    if(request.method == "POST"):
        json = request.json
        user = UserHandler.getUserByEmail(json['email'])
        if user[1] == HttpStatus.OK:
            return UserHandler.sendActivationEmail(json['email'])

@app.route('/account-activation/<token>', methods=['GET', 'POST'])
def activation_token(token):
    #You should print a message saying token is not valid or expired
    UserHandler.activateAccount(token)
    return redirect('http://localhost:3000')

@app.route('/login', methods = ['POST'])
def sign_in():
   return UserHandler.signIn(request.json)