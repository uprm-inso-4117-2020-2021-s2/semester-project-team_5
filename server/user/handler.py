from flask import jsonify, session
from .dao import User
from api import to_dict, verify_parameters, app, HttpStatus
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask_jwt_extended import create_access_token
from passlib.hash import pbkdf2_sha256 as sha256

class UserHandler:

    @staticmethod
    def getAllUsers():
        try:
            users = User.getAllUsers()
            result_list = []
            for user in users:
                result_list.append(to_dict(user))
            result = {
                "message": "Success!",
                "users": result_list
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR 

    @staticmethod
    def getUserById(uid):
        try:
            user = User.getUserById(uid)
            if user:
                user_dict = to_dict(user)
                result = {
                    "message": "Success!",
                    "user": user_dict
                }
                return jsonify(result), HttpStatus.OK
            else:
                return jsonify(reason="User does not exist."), HttpStatus.NOT_FOUND
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR

    @staticmethod
    def getUserByEmail(email):
        try:
            user = User.getUserByEmail(email)
            if user:
                user_dict = to_dict(user)
                result = {
                    "message": "Success!",
                    "user": user_dict
                }
                return jsonify(result), HttpStatus.OK
            else:
                return jsonify(reason="User does not exist."), HttpStatus.NOT_FOUND
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR

    @staticmethod
    def sentEmail():
        return jsonify(status='Please check your email to verify it!'), HttpStatus.OK

    @staticmethod
    def createUser(json):
        valid_params = verify_parameters(json, User.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                email_exists = User.getUserByEmail(json['email'])
                if email_exists:
                    return jsonify(message="Email already taken. Please use another one."), HttpStatus.BAD_REQUEST
                valid_params['password'] = sha256.hash(valid_params['password'])
                created_user = User(**valid_params).create()
                user_dict = to_dict(created_user)
                result = {
                    "message": "Success!",
                    "user": user_dict,
                }
                return jsonify(result), HttpStatus.CREATED
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), HttpStatus.INTERNAL_SERVER_ERROR
        else:
            return jsonify(message="Bad Request!"), HttpStatus.BAD_REQUEST

    @staticmethod
    def activateAccount(token):
        try:
            user = User.getUserByEmail(UserHandler.verify_user_token(token))
            if user is None:
                pass
            User.activateUser(user)
        except Exception as err:
            return jsonify(message="Server error!", error=err.__str__()), HttpStatus.INTERNAL_SERVER_ERROR
        return jsonify(status='Success!'), HttpStatus.OK

    @staticmethod
    def get_user_token(email, expires_sec=1800):
        s = Serializer(app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'email': email}).decode('utf-8')

    @staticmethod
    def getUserByUsername(username):
        try:
            user = User.getUserByUsername(username)
            if user:
                user_dict = to_dict(user)
                result = {
                    "message": "Success!",
                    "user": user_dict
                }
                return jsonify(result), HttpStatus.OK
            else:
                return jsonify(reason="User does not exist."), HttpStatus.NOT_FOUND
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR

    @staticmethod
    def verify_user_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            email = s.loads(token)['email']
        except:
            return None
        return email

    @staticmethod
    def sign_in(json):
        #validate data
        if ('email' in json) and ('password' in json):
            #get user data from db
            user = User.getUserByEmail(json['email'])
            #if user exists and password match return a valid JWT in the response otherwise return error.
            if user and sha256.verify(json['password'], user.password):
                access_token = create_access_token(identity = user.user_id)
                return jsonify(access_token = access_token), HttpStatus.OK
            else:
                return jsonify(Error = 'email or password incorrect'), HttpStatus.NOT_FOUND
        return jsonify(Error = 'Malformed body'), HttpStatus.BAD_REQUEST