# Pre-Built Rest API

An API written in Express with a PostgreSQL database and JWT authentication.

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
- Data routes:
  - POST /api/data - user can add data
  - PUT /api/data/update - user can update data
  - GET /api/data/all - get all user created data
  - GET /api/data - get data of current authenticated user
  - GET /api/data/:uniqueData - get data of specific user by their uniqueData
  - DELETE /api/data - delete data by their uniqueData

## TODO:

- Add password recovery.
