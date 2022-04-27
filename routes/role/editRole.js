const express = require('express');
const httpStatus = require('http-status');
const errorMiddleware = require('../../middlewares/errorMiddleware');
const RoleModel = require('../../model/roleModel');

const app = express();

app.patch('/role/:id', async (req, res, next) => {
  const _id = req.params.id;
  const updatedRole = await RoleModel.findByIdAndUpdate(_id, req.body, { new: true })
    .catch((error) => {
      next(error);
    });
  res.sendWrapped(updatedRole, httpStatus.OK);
});

app.use(errorMiddleware);

module.exports = app;
