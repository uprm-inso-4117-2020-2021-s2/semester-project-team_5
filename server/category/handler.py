from flask import jsonify, session
from category.dao import Category
from api import to_dict, verify_parameters, HttpStatus

class CategoryHandler:

    @staticmethod
    def getAllCategories():
        try:
            categories = Category.getAllCategories()
            result_list = []
            for category in categories:
                result_list.append(to_dict(category))
            result = {
                "message": "Success!",
                "categories": result_list
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR 

    @staticmethod
    def getCategoryById(cid):
        try:
            category = Category.getCategoryById(cid)
            category_dict = to_dict(category)
            result = {
                "message": "Success!",
                "category": category_dict
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR

    @staticmethod
    def getCategoriesByUserId(uid):
        try:
            categories = Category.getCategoriesByUserId(uid)
            result_list = []
            for category in categories:
                result_list.append(to_dict(category))
            result = {
                "message": "Success!",
                "categories": result_list
            }
            return jsonify(result), HttpStatus.OK
        except Exception as e:
            return jsonify(reason="Server error", error=e.__str__()), HttpStatus.INTERNAL_SERVER_ERROR 

    @staticmethod
    def createCategory(json):
        valid_params = verify_parameters(json, Category.REQUIRED_PARAMETERS)
        if valid_params:
            try:
                category_exists = Category.getCategoryByUserIdAndName(json['user_id'], json['name'])
                if category_exists:
                    return jsonify(message="The category you tried to create already exsists."), HttpStatus.BAD_REQUEST
                category = Category(**valid_params).create()
                category_dict = to_dict(category)
                result = {
                    "message": "Success!",
                    "category": category_dict,
                }
                return jsonify(result), HttpStatus.CREATED
            except Exception as err:
                return jsonify(message="Server error!", error=err.__str__()), HttpStatus.INTERNAL_SERVER_ERROR
        else:
            return jsonify(message="Bad Request!"), HttpStatus.BAD_REQUEST

    @staticmethod
    def deleteCategory(cid):
        try:
            deleted_categories = Category.delete(cid)
            result = {
                "message": "Success!",
                "package": to_dict(deleted_categories)
            }
            return jsonify(result), HttpStatus.OK
        except:
            return jsonify(message="Bad Request!"), HttpStatus.BAD_REQUEST