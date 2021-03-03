from flask import Flask
from flask_cors import CORS, cross_origin

#App instance

app = Flask("trackpack")
app.config['CORS_HEADER'] = 'Content-type'