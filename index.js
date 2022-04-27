require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())

const rootRoute = require('./routes/rootRoute')
app.use(rootRoute)
const registerRoute = require('./routes/auth/registerRoute')
app.use(registerRoute)
const loginRoute = require('./routes/auth/loginRoute')
app.use(loginRoute)


const port = 3000
app.listen(port, () => {
  console.log(`API was running on http://localhost:${port}`);
})