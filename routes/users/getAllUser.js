const express = require('express');
const httpStatus = require('http-status');
const authorize = require('../../middlewares/authorizationMiddleware');
const errorMiddleware = require('../../middlewares/errorMiddleware');
const UserModel = require('../../model/userModel');

const app = express();

app.use(authorize);

app.get('/user', async (req, res) => {
  try {
    const users = await UserModel.find();

    if (!users || !users.length) return res.sendWrapped('Users empty.', httpStatus.NOT_FOUND);

    res.sendWrapped(users, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_REQUEST);
  }
});

app.use(errorMiddleware);

module.exports = app;
