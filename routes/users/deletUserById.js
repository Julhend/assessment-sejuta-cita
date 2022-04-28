const express = require('express');
const httpStatus = require('http-status');
const authorize = require('../../middlewares/authorizationMiddleware');
const errorMiddleware = require('../../middlewares/errorMiddleware');
const UserModel = require('../../model/userModel');
const { admin, basicRole } = require('../../middlewares/roleValidation');

const app = express();

app.use(authorize);

app.delete('/user/:id', basicRole, async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await UserModel.deleteOne({ _id: id })
      .catch((error) => {
        next(error);
      });
    let message;
    if (user.deletedCount === 0) {
      message = 'user not found';
    } else {
      message = 'user deleted successfully';
    }
    res.sendWrapped(message, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, httpStatus.BAD_REQUEST);
  }
});

app.use(errorMiddleware);

module.exports = app;
