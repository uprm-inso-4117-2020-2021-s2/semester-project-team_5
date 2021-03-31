from user.dao import User
from category.dao import Category
from package.dao import Package
from package_status.dao import PackageStatus
from api import db

#run this to create the tables on pgadmin

db.drop_all()
db.create_all()