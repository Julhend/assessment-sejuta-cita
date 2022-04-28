const httpStatus = require('http-status');
const RoleModel = require('../model/roleModel');

const roleName = async (role) => {
  const roles = await RoleModel
    .findOne({
      _id: role,
    }).lean();

  return roles;
};

const admin = async (req, res, next) => {
  const { role } = req.user;
  const checkRole = await roleName(role);

  if (checkRole.roleName !== 'admin') next(res.sendWrapped('Access denied', httpStatus.FORBIDDEN));
  next();
};

const basic = async (req, res, next) => {
  const { role } = req.user;
  const checkRole = await roleName(role);

  if (checkRole.roleName !== 'basic') next(res.sendWrapped('Access denied', httpStatus.FORBIDDEN));
  next();
};

module.exports = {
  basic,
  admin,
};
