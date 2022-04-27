const express = require('express');
const authorize = require('../../middlewares/authorizationMiddleware');
const RoleModel = require('../../model/roleModel');

const app = express();

app.use(authorize);

app.get('/role', async (req, res) => {
  const { user } = req;
  const role = await RoleModel.find({ userId: user.id }).lean();
  res.send(role);
});

module.exports = app;
