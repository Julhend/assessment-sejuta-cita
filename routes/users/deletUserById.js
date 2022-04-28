const express = require('express');
const httpStatus = require('http-status');
const authorize = require('../../middlewares/authorizationMiddleware');
const errorMiddleware = require('../../middlewares/errorMiddleware');
const UserModel = require('../../model/userModel');
const { admin, basic } = require('../../middlewares/roleValidation');

const app = express();

app.use(authorize);

app.delete('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({ _id: id });

    if (!user) return res.sendWrapped('User not found.', httpStatus.NOT_FOUND);

    user.destroy();

    res.sendWrapped(user);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_REQUEST);
  }
});

app.use(errorMiddleware);

module.exports = app;
