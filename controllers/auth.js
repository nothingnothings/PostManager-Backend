const { validationResult } = require('express-validator');
const { hash, compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const keys = require('../config/keys');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        name: name,
        password: hashedPassword,
      });

      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: 'User was created successfully!',
        userId: result._id,
        name: req.body.name
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error(
          'No user could be found for the entered email.'
        );
        error.statusCode = 404;
        throw error;
      }
      loadedUser = user;
      return compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Invalid Password. Please try again.');
        error.statusCode = 401;
        throw error;
      } else {
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id,
          },
          keys.jwtSecret,
          {
            expiresIn: '1h',
          }
        );
        res.status(200).json({
          token: token,
          name: loadedUser.name,
          userId: loadedUser._id.toString(),
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};
