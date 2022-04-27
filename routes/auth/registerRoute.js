const express = require('express');
const httpStatus = require('http-status');
const { hashPassword } = require('../../helpers/bcryptHelper');
const { signJwt } = require('../../helpers/jwtHelper');
const errorMiddleware = require('../../middlewares/errorMiddleware');
const UserModel = require('../../model/userModel');

const app = express.Router();

app.post('/auth/register', async (req, res, next) => {
  const { body } = req;
  const { password } = body;
  const hashedPassword = await hashPassword(password);
  body.password = hashedPassword;
  const insertResult = await UserModel.create(body)
    .catch((error) => {
      next(error);
    });
  if (insertResult) {
    const result = {
      ...body,
    };
    res.sendWrapped(result, httpStatus.CREATED);
  }
});

app.use(errorMiddleware);

module.exports = app;
