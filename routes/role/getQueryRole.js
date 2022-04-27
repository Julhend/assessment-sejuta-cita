const express = require('express');
const httpStatus = require('http-status');
const RoleModel = require('../../model/roleModel');

const app = express();

app.get('/role', async (req, res) => {
  const { search } = req.query;
  if (search) {
    const role = await RoleModel
      .find({
        roleName: { $regex: search },
      }).lean();

    if (!role || !role.length) return res.sendWrapped('Not Found', httpStatus.NOT_FOUND);
    res.sendWrapped(role, httpStatus.OK);
  }
});

module.exports = app;
