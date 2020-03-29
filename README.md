# Resumer-API

An API written in Node with a PostgreSQL database and JWT authentication.
Visit the UI repo for this Web App: [resumer-ui](https://github.com/ebcp-dev/resumer-ui)

[![Build Status](https://travis-ci.org/ebcp-dev/resumer-api.svg?branch=master)](https://travis-ci.org/ebcp-dev/resumer-api)

## Created with:

- Express
- PostgreSQL
- Bcrypt.js
  - Password hashing.
- Passport
  - JWT Authentication strategy.
- Validator
  - For validation of api request body.
- Babel
  - For ES6 transpiling.

Mocha and Chai are used for unit tests. NYC is used for code coverage reporting. Integrated with Travis CI.

## Routes:

- Auth routes:
  - POST /api/user/signup - user signup route
  - POST /api/user/login - user login route with JWT authentication
  - GET /api/user/current - retrieves authenticated user details with JWT token
- Profile routes:
  - POST /api/profile - user can add profile details
  - PUT /api/profile/update - user can update profile details
  - GET /api/profile/all - get all user created profiles
  - GET /api/profile - get profile details of current authenticated user
  - GET /api/profile/:username - get profile details of specific user by their username
- Job routes:
  - POST /api/job - add job to current authenticated user's collection
  - PUT /api/job - update existing job in current authenticated user's collection
  - GET /api/job/all - get all jobs added by current user
  - DELETE /api/job - delete a job by their link

## TODO:

- Restructure Job model to show more details to user.
- Add password recovery.
- Integrate third party api.
