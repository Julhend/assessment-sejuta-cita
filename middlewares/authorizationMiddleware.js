const httpStatus = require('http-status');
const { parseJwt } = require('../helpers/jwtHelper');

function authorize(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.sendWrapped('Login First', httpStatus.BAD_REQUEST);
  } else if (!authorization.startsWith('Bearer')) {
    res.sendWrapped('Wrong token format', httpStatus.BAD_REQUEST);
  } else {
    const splittedAuthorization = authorization.split(' ');
    if (splittedAuthorization.length < 2) {
      res.sendWrapped('Wrong token format', httpStatus.BAD_REQUEST);
    } else {
      const token = splittedAuthorization[1];
      const user = parseJwt(token);
      if (!user) {
        res.sendWrapped('Expired token', httpStatus.BAD_REQUEST);
      } else {
        req.user = user;
        next();
      }
    }
  }
}

module.exports = authorize;
