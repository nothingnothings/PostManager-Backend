const express = require('express');

const router = express.Router();

const isAuth = require('../middlewareHelpers/is-auth');

const feedController = require('../controllers/feed');

router.get(
  '/posts',

  isAuth,

  feedController.getPosts
);

router.get(
  '/status',
  isAuth,

  feedController.getStatus
);

router.post(
  '/post',
  isAuth,

  [
    body('title')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Title should be at least 6 characters long.')
      .matches(/^[A-Za-z\s]+$/)
      .withMessage('Post titles must contain only letters and spaces.')
      .custom((value, { _req }) => {
        return Post.findOne({ title: value }).then((post) => {
          if (post) {
            return Promise.reject(
              'A post with the chosen title already exists, please choose another one.'
            );
          } else {
            return value;
          }
        });
      }),
    body('content')
      .trim()
      .isLength({ min: 6 })
      .withMessage('Content should be more than 6 characters long.'),
  ],

  feedController.createPost
);

router.get(
  '/post/:postId',
  isAuth,

  feedController.getSinglePost
);

module.exports = router;
