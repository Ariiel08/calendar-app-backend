# Calendar-App-Backend
Backend for the Calendar MERN App.

## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)

## Technologies
Project is created with:
* Node.js
* Express
* MongoDB

## Setup
To run this project, install it locally using npm:

```
$ npm install
$ nodemon index.js
```

Then you should add a .env file with the variables found in .env.template with your configuration:

```
PORT=
DB_CONNECTION=
SECRET_JWT_SEED=
```

PORT: the port that the server is going to run (for example: 3000).
DB_CONNECTION: the MongoDB url to make the connection to the database.
SECRET_JWT_SEED: The secret signature of the jwt token.