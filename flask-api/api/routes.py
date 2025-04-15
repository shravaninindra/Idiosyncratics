# -*- encoding: utf-8 -*-
from datetime import datetime, timezone, timedelta

from functools import wraps
import platform
import pika

from flask import request
from flask_restx import Api, Resource, fields

import jwt

from .models import db, Users, JWTTokenBlocklist
from .config import BaseConfig

from .resume_parser.resume_parser import ResumeParser
from .resume_parser import utils as utils
from .resume_parser import resume_score as resume_score
from .resume_parser import suggested_message as suggested_message
import os
import sys

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv('SA_CREDS')

rabbitMQHost = os.getenv("RABBITMQ_HOST") or "localhost"
print("Connecting to rabbitmq({}) ".format(rabbitMQHost))

infoKey = f"{platform.node()}.worker.info"
debugKey = f"{platform.node()}.worker.debug"

from .initialize import initialize_database, query_table

def log_debug(message, key=debugKey):
    print("DEBUG:", message, file=sys.stderr)
    rabbitMQ = pika.BlockingConnection(
    pika.ConnectionParameters(host=rabbitMQHost))
    rabbitMQChannel = rabbitMQ.channel()
    rabbitMQChannel.basic_publish(
        exchange='logs', routing_key=key, body=message)
    rabbitMQChannel.close()

def log_info(message, key=infoKey):
    print("INFO:", message, file=sys.stdout)
    rabbitMQ = pika.BlockingConnection(
    pika.ConnectionParameters(host=rabbitMQHost))
    rabbitMQChannel = rabbitMQ.channel()
    rabbitMQChannel.exchange_declare(exchange='logs', exchange_type='topic')
    rabbitMQChannel.basic_publish(
        exchange='logs', routing_key=key, body=message)
    rabbitMQChannel.close()

debug = rabbitMQHost+".debug"
info = rabbitMQHost+".info"

rest_api = Api(version="1.0", title="Users API")

RESUME_UPLOAD_DIR = "resume"
"""
    Flask-Restx models for api request and response data
"""

signup_model = rest_api.model('SignUpModel', {"username": fields.String(required=True, min_length=2, max_length=32),
                                              "email": fields.String(required=True, min_length=4, max_length=64),
                                              "password": fields.String(required=True, min_length=4, max_length=16)
                                              })

login_model = rest_api.model('LoginModel', {"email": fields.String(required=True, min_length=4, max_length=64),
                                            "password": fields.String(required=True, min_length=4, max_length=16)
                                            })

user_edit_model = rest_api.model('UserEditModel', {"userID": fields.String(required=True, min_length=1, max_length=32),
                                                   "username": fields.String(required=True, min_length=2, max_length=32),
                                                   "email": fields.String(required=True, min_length=4, max_length=64)
                                                   })

@rest_api.route('/api/database/initialize')
class database(Resource):
    def get(self):
        initialize_database()
        log_info("Database initialized")
        # query_table()
        return {"Database initialized": True}, 200

"""
   Helper function for JWT token required
"""

def token_required(f):

    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if "authorization" in request.headers:
            token = request.headers["authorization"]

        if not token:
            return {"success": False, "msg": "Valid JWT token is missing"}, 400

        try:
            data = jwt.decode(token, BaseConfig.SECRET_KEY, algorithms=["HS256"])
            current_user = Users.get_by_email(data["email"])

            if not current_user:
                return {"success": False,
                        "msg": "Sorry. Wrong auth token. This user does not exist."}, 400

            token_expired = db.session.query(JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()

            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400

            if not current_user.check_jwt_auth_active():
                return {"success": False, "msg": "Token expired."}, 400

        except:
            return {"success": False, "msg": "Token is invalid"}, 400

        return f(current_user, *args, **kwargs)

    return decorator


"""
    Flask-Restx routes
"""


@rest_api.route('/api/users/register')
class Register(Resource):
    """
       Creates a new user by taking 'signup_model' input
    """

    @rest_api.expect(signup_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _username = req_data.get("username")
        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Users.get_by_email(_email)
        if user_exists:
            return {"success": False,
                    "msg": "Email already taken"}, 400

        new_user = Users(username=_username, email=_email)

        new_user.set_password(_password)
        new_user.save()
        log_info("New user created")
        return {"success": True,
                "userID": new_user.id,
                "msg": "The user was successfully registered"}, 200


@rest_api.route('/api/users/login')
class Login(Resource):
    """
       Login user by taking 'login_model' input and return JWT token
    """

    @rest_api.expect(login_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Users.get_by_email(_email)

        if not user_exists:
            return {"success": False,
                    "msg": "This email does not exist."}, 400

        if not user_exists.check_password(_password):
            return {"success": False,
                    "msg": "Wrong credentials."}, 400

        # create access token uwing JWT
        token = jwt.encode({'email': _email, 'exp': datetime.utcnow() + timedelta(minutes=30)}, BaseConfig.SECRET_KEY)

        user_exists.set_jwt_auth_active(True)
        user_exists.save()
        log_info("User logged in")
        return {"success": True,
                "token": token,
                "user": user_exists.toJSON()}, 200


@rest_api.route('/api/users/edit')
class EditUser(Resource):
    """
       Edits User's username or password or both using 'user_edit_model' input
    """

    @rest_api.expect(user_edit_model)
    @token_required
    def post(self, current_user):

        req_data = request.get_json()

        _new_username = req_data.get("username")
        _new_email = req_data.get("email")

        if _new_username:
            self.update_username(_new_username)

        if _new_email:
            self.update_email(_new_email)

        self.save()

        return {"success": True}, 200


@rest_api.route('/api/users/logout')
class LogoutUser(Resource):
    """
       Logs out User using 'logout_model' input
    """

    @token_required
    def post(self, current_user):

        _jwt_token = request.headers["authorization"]

        jwt_block = JWTTokenBlocklist(jwt_token=_jwt_token, created_at=datetime.now(timezone.utc))
        jwt_block.save()

        self.set_jwt_auth_active(False)
        self.save()

        return {"success": True}, 200
    
@rest_api.route('/api/upload/resume', methods=['POST'])
class fileUpload(Resource):
    def post(self):
        target=os.path.join(".",RESUME_UPLOAD_DIR)
        if not os.path.isdir(target):
            os.mkdir(target)
        print("welcome to upload")
        response = "Something"
        try:
            print("Request is", request.files)
            file = request.files['file'] 
            destination="/".join([target, file.filename])
            file.save(destination)
            try:
                response=ResumeParser(destination).get_extracted_data()
                log_info("File uploaded")
            except Exception as e:
                print(e)
                log_debug(e)
                return {"success": False,
                        "msg": "Error parsing resume"}, 400
        except Exception as e:
            print(e)  
            log_debug(e)
        
        return response, 200
    
@rest_api.route('/api/parse/resume/text')
class ReadResumeText(Resource):
    def post(self):
        req_data = request.get_json()
        resume_text = req_data.get("text")
        try:
            data = ResumeParser(resume_text).get_extracted_data()
            log_info("File data extracted")
        except Exception as e:
            print(e)
            log_debug(e)
            return {"success": False,
                    "msg": "Error parsing resume"}, 400
        return  data,200

@rest_api.route('/api/parse/resume')
class ReadResume(Resource):
    def post(self):
        req_data = request.get_json()
        resume_filepath = req_data.get("filename")
        try:
            data = ResumeParser(resume_filepath).get_extracted_data()
            log_info("Resume parsed")
        except Exception as e:
            print(e)
            log_debug(e)
            return {"success": False,
                    "msg": "Error parsing resume"}, 400
        return  data,200
    
@rest_api.route('/api/parse/job_description')
class ReadJobDescription(Resource):
    def post(self):
        req_data = request.get_json()
        job_description_text = req_data.get("text")
        company_name = req_data.get("company_name")
        job_title = req_data.get("job_title")
        data = {
            "skills": [],
            "company_name": company_name,
            "job_title": job_title
        }
        try:
            if job_description_text == "":
                job_description_filepath = "test-files/" + company_name + "_" + job_title + ".txt"
                extracted_data = ResumeParser(job_description_filepath).get_extracted_data()
                data["skills"] = extracted_data["skills"]
            else:
                data["skills"] = utils.get_job_desc_skills(job_description_text)
            log_info("Resume job description parsed")
                
        
        except Exception as e:
            print(e)
            log_debug(e)
            return {"success": False,
                    "msg": "Error parsing job description"}, 400
        
        return  data,200
    

    
@rest_api.route('/api/analyze/resume')
class ResumeAnalysis(Resource):
    def post(self):
        req_data = request.get_json()
        resume = req_data.get("resume_data")
        job_description = req_data.get("job_description_data")
        analysis_data = resume_score.get_analysis(resume,job_description)
        log_info("Resume analyze")
        return analysis_data,200
    
@rest_api.route('/api/suggested_message')
class SuggestedMessage(Resource):
    def post(self):
        req_data = request.get_json()
        company = req_data.get("company")
        job_title = req_data.get("job_title")
        req_skills = req_data.get("skills")
        name = req_data.get("name")
        if company == "" or job_title == "" or req_skills == []:
            return {"success": False,
                    "msg": "Error getting suggested message"}, 400
        
        message = suggested_message.get_suggested_message(req_skills, job_title, company, name)
        log_info("Resume suggested message")
        return message,200








