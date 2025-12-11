const requestTime = (req, res, next) => {
  req.requestedAt = new Date();
  next();
};

module.exports = requestTime;


