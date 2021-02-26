from flask import Flask, request, json, jsonify
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager, create_access_token
from passlib.hash import pbkdf2_sha256 as sha256

# Fake db used as a placeholder
fake_db = [{'username': 'sammy', 'hashed_password': '$pbkdf2-sha256$29000$NCaEMEaIkVJKqVWqtXZubQ$Qs1I8LRVGtUPbVDz4xxkhZJeNTaZG.eCab5PRzEDY1s'}]

#App instance
app = Flask("trackpack")
app.config['CORS_HEADER'] = 'Content-type'
app.config['SECRET_KEY'] = 'usafe_secret_key'
app.config['JWT_SECRET_KEY'] = 'unsafe_JWT_secret_key'

jwt = JWTManager(app)

@app.route('/login', methods = ['POST'])
def login():
    #Get json from request
    data = request.get_json()
    #validate data
    if ('username' in data) and ('password' in data):
        #Get the users data from db. Placeholder code, this will call the user DAO to get the user
        user = next((row for row in fake_db if row['username'] == data['username']), None)
        #If not registered (user does not exist) or the password does not match then return error stating that password or username is incorrect
        if user and sha256.verify(data['password'], user['hashed_password']):
            # Create JWT access token and return it
            access_token = create_access_token(identity = user['username'])
            return jsonify(access_token = access_token), 200
        else:
            return jsonify(Error = 'User not found'), 404
    return jsonify(Error = 'Malformed body'), 400
