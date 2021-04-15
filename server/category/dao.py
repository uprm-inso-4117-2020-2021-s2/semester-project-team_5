from sqlalchemy.dialects.postgresql import UUID
from api import db
from user.dao import User
from package.dao import Package
import uuid

class Category(db.Model):
    REQUIRED_PARAMETERS = {'user_id', 'name'}
    
    __tablename__ = 'category'
    category_id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.user_id'),nullable=False) 
    name = db.Column(db.String(30), nullable=False)

    def __init__(self, **args):
        self.user_id = args.get('user_id')
        self.name = args.get('name')

    @property
    def pk(self):
        return self.category_id

    @staticmethod
    def getAllCategories():
        return Category().query.all()

    @staticmethod
    def getCategoryById(cid):
        return Category().query.filter_by(category_id=cid).first()

    @staticmethod
    def getCategoryByUserIdAndName(uid, cname):
        return Category().query.filter_by(user_id=uid, name=cname).first()

    @staticmethod
    def getCategoriesByUserId(uid):
        return Category().query.filter_by(user_id=uid).all()

    @staticmethod
    def delete(cid):
        category = Category.getCategoryById(cid)

        if not category:
            return None

        #For all packages in a category change their category to a default one
        packages = Package.getPackagesByCategory(cid)
        for package in packages:
            #Asuming that default category has id of 0
            #TODO: Find default category id or create it
            package.category_id = 0

        db.session.delete(category)
        db.session.commit()
        return category

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self