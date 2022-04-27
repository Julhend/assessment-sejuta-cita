function errorMiddleware(err, req, res, next) {
  res.status(400).send({ ...err })
}

module.exports = errorMiddleware