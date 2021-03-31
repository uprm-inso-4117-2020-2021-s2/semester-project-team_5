from flask import json, request, url_for, redirect, jsonify
from flask_mail import Message
from user.handler import UserHandler
from api import app, mail

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
        if user[1] == 200:
            send_activation_email(json['email'])
            return UserHandler.sentEmail()

@app.route('/account-activation/<token>', methods=['GET', 'POST'])
def activation_token(token):
    #You should print a message saying token is not valid or expired
    UserHandler.activateAccount(token)
    return redirect('http://localhost:3000')

def send_activation_email(email):
    token = UserHandler.get_user_token(email)

    msg = Message('Email Confirmation Code',
                    sender='track.pack4117@gmail.com',
                    recipients=[email])
    msg.body = f'''To activate your account visit the following link:
{url_for('activation_token', token=token, _external=True)}
If you did not make this account then simply ignore this email.
'''
    mail.send(msg)

@app.route('/login', methods = ['POST'])
def sign_in():
   return UserHandler.sign_in(request.json)