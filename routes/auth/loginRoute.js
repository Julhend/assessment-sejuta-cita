const express = require('express');
const httpStatus = require('http-status');
const { comparePassword } = require('../../helpers/bcryptHelper');
const { signJwt } = require('../../helpers/jwtHelper');
const UserModel = require('../../model/userModel');

const app = express.Router();

app.post('/auth/login', async (req, res) => {
  const { body } = req;
  const { email } = body;
  const { password } = body;
  const searchResult = await UserModel.findOne({
    email,
  }).lean();
  if (searchResult) {
    const isPasswordMatch = await comparePassword(password, searchResult.password);
    if (isPasswordMatch) {
      const token = signJwt({ id: searchResult._id, role: searchResult.role });
      const result = {
        ...searchResult,
        token,
      };
      res.sendWrapped(result, httpStatus.OK);
    } else {
      res.sendWrapped('Password not match', httpStatus.BAD_REQUEST);
    }
  } else {
    res.sendWrapped('User not found', httpStatus.NOT_FOUND);
  }
});

module.exports = app;
