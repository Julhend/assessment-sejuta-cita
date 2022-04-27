const express = require('express');
const errorMiddleware = require('../../middlewares/errorMiddleware');
const RoleModel = require('../../model/roleModel');

const app = express();

app.delete('/role/:id', async (req, res, next) => {
  const _id = req.params.id;
  await RoleModel.deleteOne({ _id })
    .catch((error) => {
      next(error);
    });
  res.send('Ok');
});

app.use(errorMiddleware);

module.exports = app;
