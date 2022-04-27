const express = require('express');
const RoleModel = require('../../model/roleModel');

const app = express();

app.get('/role/query', async (req, res) => {
  const { search } = req.query;
  const role = await RoleModel
    .find({
      roleName: { $regex: search },
    }).lean();
  res.send(role);
});

module.exports = app;
