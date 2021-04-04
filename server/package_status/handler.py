from flask import jsonify, session
from package_status.dao import PackageStatus
from api import to_dict, verify_parameters, HttpStatus

class PackageStatusHandler:

    @staticmethod
    def getAllStatuses():
        try:
            statuses = PackageStatus.getAllStatuses()
            result_list = []
            for status in statuses:
                result_list.append(to_dict(status))
            result = {
                "message": "Success!",
                "statuses": result_list
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR 

    @staticmethod
    def getStatusById(sid):
        try:
            status = PackageStatus.getStatusById(sid)
            status_dict = to_dict(status)
            result = {
                "message": "Success!",
                "status": status_dict
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR

    @staticmethod
    def getStatusByCode(scode):
        try:
            status = PackageStatus.getStatusByCode(scode)
            status_dict = to_dict(status)
            result = {
                "message": "Success!",
                "status": status_dict
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR 

    @staticmethod
    def getStatusesByPackageId(pid):
        try:
            statuses = PackageStatus.getStatusesByPackageId(pid)
            result_list = []
            for status in statuses:
                result_list.append(to_dict(status))
            result = {
                "message": "Success!",
                "statuses": result_list
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR 

    @staticmethod
    def createStatus(json):
        valid_params = verify_parameters(json, PackageStatus.REQUIRED_PARAMETERS)
        if valid_params:
            try:       
                status = PackageStatus(**valid_params).create()
                status_dict = to_dict(status)
                result = {
                    "message": "Success!",
                    "status": status_dict,
                }
                return jsonify(result), HttpStatus.CREATED
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), HttpStatus.INTERNAL_SERVER_ERROR
        else:
            return jsonify(message="Bad Request!"), HttpStatus.BAD_REQUEST

    @staticmethod
    def deleteStatus(json):
        try:
            deleted_status = PackageStatus.deleteStatusById(json['status_id'])
            result = {
                "message": "Success!",
                "status": to_dict(deleted_status)
            }
            return jsonify(result), HttpStatus.OK
        except Exception as err:
            return jsonify(message="Server error!", error=err.__str__()), HttpStatus.INTERNAL_SERVER_ERROR
