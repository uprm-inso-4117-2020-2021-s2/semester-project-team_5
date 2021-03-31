from api import db
from category.dao import Category
from datetime import datetime

class Package(db.Model):
    REQUIRED_PARAMETERS = {'carrier', 'tracking_number', 'name', 'creation_date', 'category_id'}
    
    __tablename__ = 'package'
    package_id = db.Column(db.Integer, primary_key=True, nullable=False)
    carrier = db.Column(db.String(30), nullable=False)
    tracking_number = db.Column(db.String(64), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    creation_date = db.Column(db.Date, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.category_id'), nullable=False)
    image_path = db.Column(db.String(200), nullable=True)

    def __init__(self, **args):
        self.carrier = args.get('carrier')
        self.tracking_number = args.get('tracking_number')
        self.name = args.get('name')
        self.creation_date = args.get('creation_date')
        self.category_id = args.get('category_id')
        self.image_path = args.get('image_path')

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

    @staticmethod
    def getPackageByTrackingNumberAndUserId(tnumber, uid):
        return Category().query.filter_by(user_id=uid).join(Package, Category.category_id==Package.category_id).filter_by(tracking_number=tnumber).all()

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