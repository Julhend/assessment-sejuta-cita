require('dotenv').config();
const express = require('express');

const app = express();
const httpStatus = require('http-status');

app.use(express.json());

app.response.sendWrapped = function (data, statusCode = httpStatus.OK) {
  return this.status(statusCode).send({
    status: statusCode,
    data,
  });
};

const rootRoute = require('./routes/rootRoute');

app.use(rootRoute);
const registerRoute = require('./routes/auth/registerRoute');

app.use(registerRoute);
const loginRoute = require('./routes/auth/loginRoute');

app.use(loginRoute);

const addRole = require('./routes/role/addRole');

app.use(addRole);

const getQueryRole = require('./routes/role/getQueryRole');

app.use(getQueryRole);
const editRole = require('./routes/role/editRole');

app.use(editRole);
const deleteRole = require('./routes/role/deleteRole');

app.use(deleteRole);

const port = 3000;
app.listen(port, () => {
  console.log(`API was running on http://localhost:${port}`);
});
