from sqlalchemy.dialects.postgresql import UUID
from api import db
from user.dao import User
from package.dao import Package
import uuid

class Category(db.Model):
    REQUIRED_PARAMETERS = {'user_id', 'name'} # pragma: no mutate
    
    __tablename__ = 'category' # pragma: no mutate
    category_id = db.Column(db.Integer, primary_key=True, nullable=False) # pragma: no mutate
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey('user.user_id'),nullable=False)  # pragma: no mutate
    name = db.Column(db.String(30), nullable=False) # pragma: no mutate

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
    def delete(category_id, user_id):
        category = Category.getCategoryById(category_id)

        if not category:
            return None

        #For all packages in a category change their category to a default one
        packages = Package.getPackagesByCategory(category_id)
        #Assuming that unlisted category exists
        unlisted_category = Category.getCategoryByUserIdAndName(user_id, 'unlisted')

        for package in packages:
            package.category_id = unlisted_category.category_id

        db.session.delete(category)
        db.session.commit()
        return category


    # Moved here to remove circular import
    @staticmethod
    def getPackageByTrackingNumberAndUserId(tnumber, uid):
        return Category().query.filter_by(user_id=uid).join(Package, Category.category_id==Package.category_id).filter_by(tracking_number=tnumber).all() # pragma: no mutate

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self