const express = require('express')
const { comparePassword } = require('../../helpers/bcryptHelper')
const { signJwt } = require('../../helpers/jwtHelper')
const UserModel = require('../../model/userModel')

const app = express.Router()

app.post('/auth/login', async (req, res) => {
  const body = req.body
  const email = body.email
  const password = body.password
  const searchResult = await UserModel.findOne({
    email: email
  }).lean()
  if (searchResult) {
    const isPasswordMatch = await comparePassword(password, searchResult.password)
    if (isPasswordMatch) {
      const token = signJwt({ ...searchResult })
      const result = {
        ...searchResult,
        token
      }
      res.send(result)
    } else {
      res.send('Password not match')
    }
  } else {
    res.send('User not found')
  }
})

module.exports = app