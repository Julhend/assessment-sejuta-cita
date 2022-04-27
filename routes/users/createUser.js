const express = require('express');
const httpStatus = require('http-status');
const { hashPassword } = require('../../helpers/bcryptHelper');
const authorize = require('../../middlewares/authorizationMiddleware');
const errorMiddleware = require('../../middlewares/errorMiddleware');
const UserModel = require('../../model/userModel');

const app = express();

app.use(authorize);

app.post('/user', async (req, res) => {
  try {
    const userBody = req.body;

    const hashedPassword = await hashPassword(userBody.password);
    userBody.password = hashedPassword;
    const user = await UserModel.create(userBody);

    if (!user) return res.sendWrapped('Fail to create user.', httpStatus.BAD_REQUEST);

    res.sendWrapped(user, httpStatus.CREATED);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_REQUEST);
  }
});

app.use(errorMiddleware);

module.exports = app;
