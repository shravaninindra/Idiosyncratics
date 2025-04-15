# React UI 

React dashboard build using the Material-UI.

> Features

- Modern aesthetics UI design with simple user interface
- React, Redux, Redux-persist
- Authentication

<br />

## Quick Start in [Docker](https://www.docker.com/)

> Start the app in Docker

```bash
$ docker-compose pull   # download dependencies 
$ docker-compose build  # local set up
$ docker-compose up     # start the app 
```

Visit `http://localhost:3000` in your browser. The React UI should be up & running.

<br />

## How to use it

To use the product Node JS (>= 12.x) is required or run using Docker.

**Step #1** - Navigate to the project

```bash
$ cd idiosyncratics/react-ui
```

<br >

**Step #2** - Install dependencies via NPM or yarn

```bash
$ npm i
```

<br />

**Step #3** - Start in development mode

```bash
$ npm run start_env
```

<br />

## Configure the backend server

The product comes with a usable JWT Authentication flow that provides only the basic requests: login/logout/register. 

Application uses the environment variable API_URL which would be the backend url. To provide the url at run time, export the backend variable as API_URL and start the application using 
```bash
$ npm run start_env
```

For running it in a standalone docker container, provide the API_URL as an environment variable.
```bash
$ docker run -e API_URL=<url> <image>
```

For running it using docker compose, add it in the environments section
```yaml
environment:
    - API_URL=<url>
```

<br />

---
