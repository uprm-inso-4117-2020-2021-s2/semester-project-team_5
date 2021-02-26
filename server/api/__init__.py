from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

#AWS database credentials

db_url = 'database-1.ct1iwiyel0uh.us-east-2.rds.amazonaws.com:5432'
db_name = 'postgres'
db_username = 'postgres'
db_password = 'letmein123'

PROD_DB = f'postgresql://{db_username}:{db_password}@{db_url}/{db_name}'

#App instance

app = Flask("trackpack")
app.config['CORS_HEADER'] = 'Content-type'
app.config['SQLALCHEMY_DATABASE_URI'] = PROD_DB
app.config['SECRET_KEY'] = "trackpack"

db = SQLAlchemy(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'track.pack4117@gmail.com'
app.config['MAIL_PASSWORD'] = 'tK4eNbPNqSh27QgUPAl1UQMHW0pPo9RbYQrQJykA'
mail = Mail(app)

CORS(app)

def to_dict(obj):
    res = {column.key: getattr(obj, attr)
           for attr, column in obj.__mapper__.c.items()}
    return res

def verify_parameters(jsonP, params):
    for param, value in jsonP.items():
        if param in params and value is None:
            return None
    return jsonP