from flask import request, url_for, redirect
from flask_mail import Message
from api.handler.user import UserHandler
from api import app, mail

@app.route('/', methods=['GET'])
def hello_world():
    return "Hello World!"

@app.route("/users", methods=['GET', 'POST'])
def get_all_users_or_create():
    if request.method == 'GET':
        return UserHandler.getAllUsers()
    elif request.method == 'POST':
        return UserHandler.createUser(request.json)

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