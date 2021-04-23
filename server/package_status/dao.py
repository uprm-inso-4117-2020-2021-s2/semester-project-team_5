from api import db
from package.dao import Package
from datetime import datetime

class Location(db.Model):
    __tablename__ = 'location'
    location_id = db.Column(db.Integer, primary_key=True, nullable=False)
    country = db.Column(db.Text, nullable=False)
    state = db.Column(db.Text)
    city = db.Column(db.Text, nullable=False)
    postal_code = db.Column(db.Text, nullable=False)

class PackageStatus(db.Model):
    REQUIRED_PARAMETERS = {'description', 'code', 'date', 'package_id'}
    
    __tablename__ = 'status'
    status_id = db.Column(db.Integer, primary_key=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    code = db.Column(db.Text, nullable=False)
    date = db.Column(db.Date, nullable=False)
    package_id = db.Column(db.Integer, db.ForeignKey('package.package_id'), nullable=False)

    def __init__(self, **args):
        self.description = args.get('description')
        self.code = args.get('code')
        self.date = args.get('date')
        self.creation_date = args.get('creation_date')
        self.package_id = args.get('package_id')

    @property
    def pk(self):
        return self.status_id

    @staticmethod
    def getAllStatuses():
        return PackageStatus().query.all()

    @staticmethod
    def getStatusById(sid):
        return PackageStatus().query.filter_by(status_id=sid).first()

    @staticmethod
    def getStatusByCode(scode):
        return PackageStatus().query.filter_by(code=scode).first()

    @staticmethod
    def getStatusesByPackageId(pid):
        return PackageStatus().query.filter_by(package_id=pid).all()

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    @staticmethod
    def deleteStatusesByPackageId(pid):
        statuses = PackageStatus.getStatusesByPackageId(pid)
        if not statuses:
            return None
        db.session.delete(statuses)
        db.session.commit()
        return statuses

    @staticmethod
    def deleteStatusById(sid):
        status = PackageStatus.getStatusById(sid)
        if not status:
            return None
        db.session.delete(status)
        db.session.commit()
        return status