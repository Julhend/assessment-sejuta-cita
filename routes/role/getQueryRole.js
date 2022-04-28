const express = require('express');
const httpStatus = require('http-status');
const RoleModel = require('../../model/roleModel');

const app = express();

app.get('/role', async (req, res) => {
  const { search } = req.query;
  let role;
  if (search) {
    role = await RoleModel
      .find({
        roleName: { $regex: search },
      }).lean();
  } else {
    role = await await RoleModel.find();
  }
  if (!role || !role.length) return res.sendWrapped('Not Found', httpStatus.NOT_FOUND);
  res.sendWrapped(role, httpStatus.OK);
});

module.exports = app;
