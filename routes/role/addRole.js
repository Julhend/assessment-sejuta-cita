const express = require('express');
const httpStatus = require('http-status');
const authorize = require('../../middlewares/authorizationMiddleware');
const errorMiddleware = require('../../middlewares/errorMiddleware');
const RoleModel = require('../../model/roleModel');

const app = express();

app.use(authorize);

app.post('/role', async (req, res, next) => {
  const { body } = req;
  const result = await RoleModel.create(body)
    .catch((error) => {
      next(error);
    });
  res.sendWrapped(result, httpStatus.CREATED);
});

app.use(errorMiddleware);

module.exports = app;
