# -*- encoding: utf-8 -*-
import pytest
import json
from doubles import allow
from api.models import  Users
from api.resume_parser.suggested_message import get_suggested_message
from api.resume_parser.resume_score import get_tf_idf_cosine_similarity
from api import app
import unittest
import mock

"""
   Sample test data
"""

DUMMY_USERNAME = "apple"
DUMMY_EMAIL = "apple1@apple.com"
DUMMY_PASS = "newpassword"

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

#Test if a user signsup successfully
def test_user_signup(client):
    """
       Tests /users/register API
    """
    allow(Users).get_by_email.and_return(None)

    response = client.post(
        "api/users/register",
        data=json.dumps(
            {
                "username": DUMMY_USERNAME,
                "email": DUMMY_EMAIL,
                "password": DUMMY_PASS
            }
        ),
        content_type="application/json")

    data = json.loads(response.data.decode())
    assert response.status_code == 200
    assert "The user was successfully registered" in data["msg"]

#Test if a user signsup remainds invalid due to incorrect fields
def test_user_signup_invalid_data(client):
    """
       Tests /users/register API: invalid data like email field empty
    """
    response = client.post(
        "api/users/register",
        data=json.dumps(
            {
                "username": DUMMY_USERNAME,
                "email": "",
                "password": DUMMY_PASS
            }
        ),
        content_type="application/json")

    data = json.loads(response.data.decode())
    assert response.status_code == 400
    assert "'' is too short" in data["msg"]

#Test if a user login is correct
def test_user_login_correct(client):
    """
       Tests /users/signup API: Correct credentials
    """
    response = client.post(
        "api/users/login",
        data=json.dumps(
            {
                "email": DUMMY_EMAIL,
                "password": DUMMY_PASS
            }
        ),
        content_type="application/json")

    data = json.loads(response.data.decode())
    assert response.status_code == 200
    assert data["token"] != ""

#Test error arising from user login
def test_user_login_error(client):
    """
       Tests /users/signup API: Wrong credentials
    """
    response = client.post(
        "api/users/login",
        data=json.dumps(
            {
                "email": DUMMY_EMAIL,
                "password": DUMMY_EMAIL
            }
        ),
        content_type="application/json")

    data = json.loads(response.data.decode())
    print(data['msg'])
    assert response.status_code == 400
    assert "Wrong credentials" in data["msg"]

class TestSuggestedMessage(unittest.TestCase):
    @mock.patch('api.resume_parser.suggested_message.openai')
    def test_suggested_message(self, mock_openai):
        mock_openai.ChatCompletion.create.return_value = mock.Mock(choices=[mock.Mock(message=mock.Mock(content='Hello'))])
        self.assertEqual(get_suggested_message(["Java", "Python"], "Software Engineer", "Amazon", "Sam"), "Hello")
        

#Test the score obtained from resume
def testResumeScore(client):
    score =  get_tf_idf_cosine_similarity("Java Python", "Java Python")
    assert score == 100

#Test to check if it parses resume correctly
def test_parse_resume(client):
    response = client.post(
        "/api/parse/resume",
        data=json.dumps(
            {
                "filename": "test-files/sample-resume.pdf"
            }
        ),
        content_type="application/json")

    response_data = json.loads(response.data.decode())
    assert response.status_code == 200
    assert response_data["name"] == "KEVIN CONROY"
    assert response_data["email"] == "kevinconroy@gmail.com"
    assert response_data["mobile_number"] == "3015201104"

#Test to check if the parsed resume text matches the content as expected correctly
def test_parse_resume_text(client): 
    with open('test-files/sample-resume.txt', 'r') as f:
        text = f.read()

    response = client.post(
        "/api/parse/resume/text",
        data=json.dumps(
            {
                "text": text
            }
        ),
        content_type="application/json")

    response_data = json.loads(response.data.decode())
    assert response.status_code == 200
    assert response_data["name"] == "KEVIN CONROY"
    assert response_data["email"] == "kevinconroy@gmail.com"
    assert response_data["mobile_number"] == "3015201104"

def test_parse_resume_invalid_file(client):
    """
       Tests /users/signup API: Wrong credentials
    """
    response = client.post(
        "/api/parse/resume",
        data=json.dumps(
            {
                "filename": "test-files/sample-resume-not-exists.pdf"
            }
        ),
        content_type="application/json")

    response_data = json.loads(response.data.decode())
    #print(response_data)
    assert response.status_code == 400
    assert response_data["msg"] == "Error parsing resume"
    
#Test to check if it parses job description when a static job description is used    
def test_parse_job_description_without_text(client):
    response = client.post(
        "/api/parse/job_description",
        data=json.dumps(
            {
                "company_name": "amazon",
                "job_title": "java_developer",
                "text" : ""
            }
        ),
        content_type="application/json")

    response_data = json.loads(response.data.decode())
    assert response.status_code == 200
    assert response_data["company_name"] == "amazon"
    assert response_data["job_title"] == "java_developer"
    assert "Java" in response_data["skills"]  

#Test to check if it parses job description when text is pasted in the text box 
def test_parse_job_description_with_text(client):
    response = client.post(
        "/api/parse/job_description",
        data=json.dumps(
            {
                "company_name": "",
                "job_title": "",
                "text" : '''
                            What You Need To Succeed
                            Experience building a high performance, horizontally scalable, low latency service using the latest technologies.
                            Proficiency in Java or other contemporary languages.
                            Proficiency in SQL and experience with scalable, distributed NoSQL datastores such as Cassandra, Hbase, Aerospike, or Redis.
                            Real passion for quality and engineering excellence at scale.
                            Strong problem solving and debugging skills and direct experience with DevOps in a SaaS environment including monitoring, alerting and on call.
                            Excellent communication and collaboration skills.
                            Undergraduate/Graduate degree in quantitative sciences/engineering.
                            2+ years of experience in design and development of software systems.
                            Nice to have
                            Experience in Big Data processing in batch or streaming contexts with platforms like Hadoop, Spark, Spark Streaming, Storm, or Flink.
                            Experience in a cloud-native stack: containerized compute (e.g. Kubernetes), infrastructure-as-code, CI/CD and cloud services (AWS, Azure).
                            Experience with batch data processing and streaming compute (e.g. Kafka).
                            Expertise in microservice architecture, REST APIs, gRPC.'''
            }
        ),
        content_type="application/json")

    response_data = json.loads(response.data.decode())
    print(response_data)
    assert response.status_code == 200
    assert response_data["company_name"] == ""
    assert response_data["job_title"] == ""
    assert "Java" in response_data["skills"] 

def test_parse_job_description_errors(client):
    response = client.post(
        "/api/parse/job_description",
        data=json.dumps(
            {
                "company_name": "",
                "job_title": "",
                "text" : ""
            }
        ),
        content_type="application/json")

    response_data = json.loads(response.data.decode())
    print(response_data)
    assert response.status_code == 400
    assert response_data["msg"] == "Error parsing job description"

#Integration Testing
def test_resume_analysis(client):
    jd_response = client.post(
        "/api/parse/job_description",
        data=json.dumps(
            {
                "company_name": "amazon",
                "job_title": "java_developer",
                "text" : ""
            }
        ),
        content_type="application/json")

    jd_response_data = json.loads(jd_response.data.decode())


    resume_response = client.post(
        "/api/parse/resume",
        data=json.dumps(
            {
                "filename": "test-files/sample-resume.pdf"
            }
        ),
        content_type="application/json")

    resume_response_data = json.loads(resume_response.data.decode())



    response = client.post(
        "/api/analyze/resume",
        data=json.dumps(
            {
                "resume_data": resume_response_data,
                "job_description_data": jd_response_data
            }
        ),
        content_type="application/json")

    response_data = json.loads(response.data.decode())
    print(response_data)
    assert response.status_code == 200
    assert response_data["email_exists"] == 1
    assert response_data["word_count"] == 987
    assert response_data["skill_score"] == 57.73502691896258


def test_resume_analysis_errors(client):
    jd_response_data = {}
    resume_response_data = {}



    response = client.post(
        "/api/analyze/resume",
        data=json.dumps(
            {
                "resume_data": resume_response_data,
                "job_description_data": jd_response_data
            }
        ),
        content_type="application/json")

    response_data = json.loads(response.data.decode())
    print(response_data)
    assert response.status_code == 500
    # assert response_data["email_exists"] == 1
    # assert response_data["word_count"] == 987
    # assert response_data["skill_score"] == 57.73502691896258

#Test to check if it returns the suggested message correctly from chatgpt api
def test_suggested_message_error(client):
    response = client.post(
        "/api/suggested_message",
        data=json.dumps(
            {
                "company": "",
                "job_title": "",
                "skills": ["Java", "Python"], 
                "name" : "Sam"
            }
        ),
        content_type="application/json")

    response_data = json.loads(response.data.decode())
    assert response.status_code == 400








