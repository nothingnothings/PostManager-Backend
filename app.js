const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const uuid = require('uuid').v4;

const multer = require('multer');

const mongoose = require('mongoose');

const keys = require('./config/keys');

const MONGODB_URI = keys.MONGODB_URI;

const feedRoutes = require('./routes/feed');

const authRoutes = require('./routes/auth');

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, PUT, PATCH, GET, POST, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Name'
  );
  next();
});

const fileStorage = multer.diskStorage({
  destination: (_req, file, cb) => {
    cb(null, 'images');
  },
  filename: (_req, file, cb) => {
    cb(null, uuid() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    if (
      req.body.title.length > 5 &&
      req.body.title.match(/^[A-Za-z\s]+$/) &&
      req.body.content.length > 6
    ) {
      return cb(null, true);
    } else {
      return cb('Invalid data inputted, file was not saved.', false);
    }
  } else {
    return cb(null, false);
  }
};

app.use(bodyParser.json());

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/auth', authRoutes);

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;

  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => {});
