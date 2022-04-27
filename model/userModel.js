const mongoose = require('mongoose');
const db = require('../connections/dbConnection');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  gender: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }
}, { timestamps: true });

const UserModel = db.model('User', UserSchema);

module.exports = UserModel