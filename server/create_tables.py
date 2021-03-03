from user.dao import User
from api import db

#run this to create the tables on pgadmin

db.drop_all()
db.create_all()