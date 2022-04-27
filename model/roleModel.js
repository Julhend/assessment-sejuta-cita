const mongoose = require('mongoose');
const db = require('../connections/dbConnection');

const UserSchema = new mongoose.Schema({
  roleName: { type: String, unique: true },
}, { timestamps: true });

const UserModel = db.model('Role', UserSchema);

module.exports = UserModel;
