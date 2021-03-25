from flask import request, redirect
from user.handler import UserHandler
from api import app, HttpStatus

@app.route('/', methods=['GET'])
def hello_world():
    return "Hello World!"

@app.route("/users", methods=['GET', 'POST'])
def get_all_users_or_create():
    if request.method == 'GET':
        return UserHandler.getAllUsers()
    elif request.method == 'POST':
        return UserHandler.createUser(request.json)

@app.route("/users/username/<string:username>", methods=['GET'])
def get__user_by_username(username):
    if request.method == 'GET':
        return UserHandler.getUserByUsername(username)

@app.route("/users/email/<string:email>", methods=['GET'])
def get__user_by_email(email):
    if request.method == 'GET':
        return UserHandler.getUserByEmail(email)

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