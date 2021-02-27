from flask import jsonify, session
from api.dao.user import User
from api import to_dict, verify_parameters, app
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

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
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def getUserById(uid):
        try:
            user = User.getUserById(uid)
            user_dict = to_dict(user)
            result = {
                "message": "Success!",
                "user": user_dict
            }
            return jsonify(result), 200
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

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
                return jsonify(result), 200
            else:
                return jsonify(reason="User does not exist."), 401
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def sentEmail():
        return jsonify(status='Please check your email to verify it!'), 200

    @staticmethod
    def createUser(json):
        valid_params = verify_parameters(json, User.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                email_exists = User.getUserByEmail(json['email'])
                if email_exists:
                    return jsonify(message="Email already taken. Please use another one."), 400
                created_user = User(**valid_params).create()
                user_dict = to_dict(created_user)
                result = {
                    "message": "Success!",
                    "user": user_dict,
                }
                return jsonify(result), 201
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), 500
        else:
            return jsonify(message="Bad Request!"), 40

    @staticmethod
    def activateAccount(token):
        try:
            user = User.getUserByEmail(UserHandler.verify_user_token(token))
            if user is None:
                pass
            User.activateUser(user)
        except Exception as err:
            return jsonify(message="Server error!", error=err.__str__()), 500
        return jsonify(status='Success!'), 200

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
                return jsonify(result), 200
            else:
                return jsonify(reason="User does not exist."), 401
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), 500

    @staticmethod
    def verify_user_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            email = s.loads(token)['email']
        except:
            return None
        return email