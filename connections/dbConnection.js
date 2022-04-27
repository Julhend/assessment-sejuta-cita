const mongoose = require('mongoose');

const { DB_URI } = process.env

const db = mongoose.createConnection(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = db