const express = require('express')
const app = express.Router()

app.get('/', (req, res) => {
  res.send('Welcome to Assessment Sejuta Cita API')
})
module.exports = app