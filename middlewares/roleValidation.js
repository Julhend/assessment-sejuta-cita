const httpStatus = require('http-status');
const RoleModel = require('../model/roleModel');

const roleName = async (role) => {
  const roles = await RoleModel
    .findOne({
      _id: role,
    }).lean();

  return roles;
};

const basicRole = async (req, res, next) => {
  const { role, id } = req.user;
  const paramId = req.params;

  const checkRole = await roleName(role);

  if (id !== paramId.id) {
    if (checkRole.roleName !== 'admin') {
      res.sendWrapped('Access denied', httpStatus.FORBIDDEN);
    } else {
      next();
    }
  } else {
    next();
  }
};

const admin = async (req, res, next) => {
  const { role } = req.user;

  const checkRole = await roleName(role);

  if (checkRole.roleName !== 'admin') {
    res.sendWrapped('Access denied', httpStatus.FORBIDDEN);
  }
  next();
};

module.exports = {
  basicRole,
  admin,
};
