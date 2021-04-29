from api import db
# from category.dao import Category
from datetime import datetime

class Package(db.Model):
    REQUIRED_PARAMETERS = {'carrier', 'tracking_number', 'name', 'creation_date', 'category_id'} # pragma: no mutate
    
    __tablename__ = 'package'# pragma: no mutate
    package_id = db.Column(db.Integer, primary_key=True, nullable=False)# pragma: no mutate
    carrier = db.Column(db.String(30), nullable=False)# pragma: no mutate
    tracking_number = db.Column(db.String(64), nullable=False)# pragma: no mutate
    name = db.Column(db.String(30), nullable=False)# pragma: no mutate
    creation_date = db.Column(db.Date, nullable=False)# pragma: no mutate
    category_id = db.Column(db.Integer, db.ForeignKey('category.category_id'), nullable=False)# pragma: no mutate
    image_name = db.Column(db.String(30), default='FaBox') # pragma: no mutate

    def __init__(self, **args):
        self.carrier = args.get('carrier')
        self.tracking_number = args.get('tracking_number')
        self.name = args.get('name')
        self.creation_date = args.get('creation_date')
        self.category_id = args.get('category_id')
        self.image_name = args.get('image_name')

    @property
    def pk(self):
        return self.package_id

    @staticmethod
    def getAllPackages():
        return Package().query.all()

    @staticmethod
    def getPackageById(pid):
        return Package().query.filter_by(package_id=pid).first()

    @staticmethod
    def getPackagesByCarrier(cname):
        return Package().query.filter_by(carrier=cname).all()

    @staticmethod
    def getPackagesByName(pname):
        return Package().query.filter_by(name=pname).all()

    @staticmethod
    def getPackagesByCategory(cid):
        return Package().query.filter_by(category_id=cid).all()

    @staticmethod
    def getPackageByTrackingNumber(tnumber):
        return Package().query.filter_by(tracking_number=tnumber).first()

    # A circular import occurs. We should consider using a repository pattern istead of DAO pattern in order to get software desing that is consistent with our domain.
    # @staticmethod
    # def getPackageByTrackingNumberAndUserId(tnumber, uid):
        # return Category().query.filter_by(user_id=uid).join(Package, Category.category_id==Package.category_id).filter_by(tracking_number=tnumber).all()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    @staticmethod
    def deletePackage(pid):
        package = Package.getPackageById(pid)
        if not package:
            return None
        db.session.delete(package)
        db.session.commit()
        return package