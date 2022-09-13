const jwt = require('jsonwebtoken');

const keys = require('../config/keys');

module.exports = (req, _res, next) => {
  const header = req.get('Authorization');
  const name = req.get('Name');

  if (!header) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  const actualToken = header.split(' ')[1];

  let decodedToken;

  try {
    decodedToken = jwt.verify(
      actualToken,
      keys.jwtSecret
    );
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  req.name = name;

  next();
};
