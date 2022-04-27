const express = require('express');
const httpStatus = require('http-status');
const errorMiddleware = require('../../middlewares/errorMiddleware');
const RoleModel = require('../../model/roleModel');

const app = express();

app.delete('/role/:id', async (req, res, next) => {
  const _id = req.params.id;
  await RoleModel.deleteOne({ _id })
    .catch((error) => {
      next(error);
    });
  res.sendWrapped('Ok', httpStatus.OK);
});

app.use(errorMiddleware);

module.exports = app;
