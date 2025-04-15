## Flask API Server

<br />

> Features:

- AN unified API structure implemented by this server
- Simple, intuitive codebase
- Flask-restX, Flask-jwt_extended
- Functional logic to provide stats on resume and job description
- Docker, automated tests

<br />

## Quick Start in [Docker](https://www.docker.com/)

> Start the app in Docker

```bash
$ docker-compose pull   # download dependencies 
$ docker-compose build  # local set up
$ docker-compose up     # start the app 
```

Visit `http://localhost:5000` in your browser. The app should be up & running.

<br />

## Table of Contents

1. [Project Structure](#project-structure)
2. [Modules](#modules)
3. [Testing](#testing)

## Project Structure

```bash
api-server-flask/
├── api
│   ├── config.py
│   ├── __init__.py
│   ├── models.py
│   └── routes.py
├── Dockerfile
├── README.md
├── requirements.txt
├── run.py
└── tests.py
```

<br />

## API

> **Register** - `api/users/register` (**POST** request)

```
POST api/users/register
Content-Type: application/json

{
    "username":"test",
    "password":"pass", 
    "email":"test@appseed.us"
}
```

<br />

> **Login** - `api/users/login` (**POST** request)

```
POST /api/users/login
Content-Type: application/json

{
    "password":"pass", 
    "email":"test@appseed.us"
}
```

<br />

> **Logout** - `api/users/logout` (**POST** request)

```
POST api/users/logout
Content-Type: application/json
authorization: JWT_TOKEN (returned by Login request)

{
    "token":"JWT_TOKEN"
}
```

<br />

## Modules

This application uses the following modules

 - Flask==1.1.4
 - flask-restx==0.4.0
 - Flask-JWT-Extended
 - pytest

## Testing

Run tests using `pytest tests.py`

<br />

---
