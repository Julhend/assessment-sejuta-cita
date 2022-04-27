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
const registerRoute = require('./routes/auth/registerRoute');
const loginRoute = require('./routes/auth/loginRoute');
const addRole = require('./routes/role/addRole');
const getQueryRole = require('./routes/role/getQueryRole');
const editRole = require('./routes/role/editRole');
const deleteRole = require('./routes/role/deleteRole');
const createUser = require('./routes/users/createUser');
const getAllUser = require('./routes/users/getAllUser');
const getUserById = require('./routes/users/getUserById');
const updateUserById = require('./routes/users/updateUserById');
const deleteUserById = require('./routes/users/deletUserById');

app.use(rootRoute);
app.use(registerRoute);
app.use(loginRoute);
app.use(addRole);
app.use(getQueryRole);
app.use(editRole);
app.use(deleteRole);
app.use(createUser);
app.use(getAllUser);
app.use(getUserById);
app.use(updateUserById);
app.use(deleteUserById);

const port = 3000;
app.listen(port, () => {
  console.log(`Sejuta Cita API was running on http://localhost:${port}`);
});
