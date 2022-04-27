const express = require('express');
const httpStatus = require('http-status');
const authorize = require('../../middlewares/authorizationMiddleware');
const errorMiddleware = require('../../middlewares/errorMiddleware');
const UserModel = require('../../model/userModel');

const app = express();

app.use(authorize);

app.patch('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userBody = req.body;

    const user = await UserModel.findOne({ _id: id });

    if (!user) return res.sendWrapped('Not found.', httpStatus.NOT_FOUND);

    Object.assign(user, userBody);

    user.save();

    res.sendWrapped(user, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_GATEWAY);
  }
});

app.use(errorMiddleware);

module.exports = app;
