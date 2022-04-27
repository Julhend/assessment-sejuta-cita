const express = require('express');
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
      const token = signJwt({ id: searchResult.id });
      const result = {
        ...searchResult,
        token,
      };
      res.send(result);
    } else {
      res.send('Password not match');
    }
  } else {
    res.send('User not found');
  }
});

module.exports = app;
