from flask import jsonify, session
from package.dao import Package
from package_status.dao import PackageStatus
from category.dao import Category
from api import to_dict, verify_parameters, HttpStatus
import requests

class PackageHandler:

    @staticmethod
    def getAllPackages():
        try:
            packages = Package.getAllPackages()
            result_list = []
            for package in packages:
                result_list.append(to_dict(package))
            result = {
                "message": "Success!",
                "packages": result_list
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR 

    @staticmethod
    def getPackageById(pid):
        try:
            package = Package.getPackageById(pid)
            package_dict = to_dict(package)
            result = {
                "message": "Success!",
                "package": package_dict
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR

    @staticmethod
    def getPackagesByCarrier(cname):
        try:
            packages = Package.getPackagesByCarrier(cname)
            result_list = []
            for package in packages:
                result_list.append(to_dict(package))
            result = {
                "message": "Success!",
                "packages": result_list
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR 

    @staticmethod
    def getPackagesByName(pname):
        try:
            packages = Package.getPackagesByName(pname)
            result_list = []
            for package in packages:
                result_list.append(to_dict(package))
            result = {
                "message": "Success!",
                "packages": result_list
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR 

    @staticmethod
    def getPackagesByCategory(cid):
        try:
            packages = Package.getPackagesByCategory(cid)
            result_list = []
            for package in packages:
                result_list.append(to_dict(package))
            result = {
                "message": "Success!",
                "packages": result_list
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR

    @staticmethod
    def getPackageByTrackingNumber(tnumber):
        try:
            package = Package.getPackageByTrackingNumber(tnumber)
            package_dict = to_dict(package)
            result = {
                "message": "Success!",
                "package": package_dict
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR

    @staticmethod
    def createPackage(json):
        print(json)
        valid_params =  verify_parameters(json, Package.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                res = requests.get("https://wwwcie.ups.com/track/v1/details/" + str(json['tracking_number']), headers={
                    "Content-Type": "application/json",
                    "transId": "1234",
                    "transactionSrc": "TestTrack",
                    "AccessLicenseNumber": "6D96561E525FE615",
                    # // "Username": "trackpack4117",
                    # // "password": "In$o41172021",
                    "Connection": "keep-alive",
                    # // "Accept": "*/*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                })
                pprint(res.json())
                return res.json(), HttpStatus.OK
            #     package_exists = Category.getPackageByTrackingNumberAndUserId(json['tracking_number'], json['user_id'])
            #     #does the user already has the package added in his account?
            #     if package_exists:
            #         return jsonify(message="The package you tried to create already exists in your account."), HttpStatus.BAD_REQUEST

            #     user_category = Category.getCategoriesByUserId(json['user_id'])
            #     #is the user trying to add the package to a category that doesn't belong to his account?
            #     #in theory, this should not happen but the condition is here just in case.
            #     #there might be better ways to implement the following verification

            #     category_valid = False
            #     for category in user_category:
            #         curr_category = to_dict(category)
            #         if curr_category['category_id'] == json['category_id']:
            #             category_valid = True

            #     if not category_valid or not user_category:
            #         return jsonify(message="You are trying to add the package to a category that doesn't belong to your account."), HttpStatus.BAD_REQUEST
                
            #     package = Package(**valid_params).create()
            #     package_dict = to_dict(package)
            #     result = {
            #         "message": "Success!",
            #         "package": package_dict,
            #     }
            #     return jsonify(result), HttpStatus.CREATED
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), HttpStatus.INTERNAL_SERVER_ERROR
        else:
            return jsonify(message="Bad Request!"), HttpStatus.BAD_REQUEST

    @staticmethod
    def deletePackage(json):
        try:
            #first, let's delete the package statuses
            deleted_statuses = PackageStatus.deleteStatusesByPackageId(json['package_id'])
            #now, we can delete the package
            deleted_package = Package.deletePackage(json['package_id'])
            result = {
                "message": "Success!",
                "package": to_dict(deleted_package)
            }
            return jsonify(result), HttpStatus.OK
        except:
            return jsonify(message="Bad Request!"), HttpStatus.BAD_REQUEST