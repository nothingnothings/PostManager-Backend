const fs = require('fs');
const { validationResult } = require('express-validator');

const ObjectId = require('mongodb').ObjectId;

const User = require('../models/user');
const Post = require('../models/post');

const ITEMS_PER_PAGE = 5;

exports.getPosts = (req, res, next) => {
  const pageNumber = req.query.page || 1;
  let totalItems;

  const userId = ObjectId(req.userId);
  const name = req.name;

  Post.countDocuments({ creator: { userId: userId, name: name } })
    .then((numPosts) => {
      totalItems = numPosts;

      return Post.find({ creator: { userId: userId, name: name } })
        .skip((pageNumber - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .then((posts) => {
          if (!posts) {
            res.status(404).json({
              message:
                'No posts encountered on database, please try again later.',
            });
          }
          res.status(200).json({
            posts: posts,
            currentPage: +pageNumber,

            totalItems: totalItems,
          });
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      }
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  console.log('ENTERED', errors);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  } else {
    if (!req.file) {
      const error = new Error('No image attached to request.');
      error.statusCode = 422;
      throw error;
    }

    const imageUrl = req.file.path;

    const title = req.body.title;
    const content = req.body.content;

    const userId = ObjectId(req.userId);

    let creator;

    const post2 = new Post({
      title: title,
      content: content,
      imageUrl: imageUrl.replace(/\\/g, '/'),
      creator: {
        userId: userId,
        name: req.body.name,
      },
    });

    post2
      .save()
      .then((result) => {
        const postData = result;

        return User.findOne({ _id: userId }).then((user) => {
          creator = user;
          return user.addPost(postData);
        });
      })
      .then((_result) => {
        res.status(201).json({
          message: 'Post created successfully',
          post: post2,
          creator: {
            _id: creator._id,
            name: creator.name,
          },
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
};

exports.editPost = (req, res, next) => {
  const postId = req.params.postId;

  const userId = ObjectId(req.userId);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }

  if (!imageUrl) {
    const error = new Error('No file was picked.');
    error.statusCode = 422;
    throw error;
  }

  Post.findOne({ _id: ObjectId(postId) })
    .then((post) => {
      if (!post) {
        const error = new Error('Post not found.');
        error.statusCode = 404;
        throw error;
      }

      if (post.creator.userId.toString() !== userId.toString()) {
        const error = new Error('Your user was not responsible for that post');
        error.statusCode = 403;
        throw error;
      }

      if (imageUrl !== post.imageUrl) {
        fs.unlink(post.imageUrl, (_err) => {});
      }
      post.title = title;
      post.imageUrl = imageUrl.replace(/\\/g, '/');
      post.content = content;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: 'Post updated!',
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getSinglePost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findOne({ _id: ObjectId(postId) })
    .then((post) => {
      if (!post) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        message: 'Post fetched.',
        post: post,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;

  const userId = ObjectId(req.userId);

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        const error = new Error('User not found in database.');
        error.statusCode = 401;
        throw error;
      }

      user.posts.pull({ postId: ObjectId(postId) });

      return user.save();
    })
    .then((_result) => {
      Post.findById(postId).then((post) => {
        if (!post) {
          const error = new Error('Post not found.');
          error.statusCode = 404;
          throw error;
        }
        fs.unlink(post.imageUrl, (_err) => {});

        return Post.findByIdAndRemove(postId).then(() => {
          res.status(200).json({
            message: 'The post was deleted.',
          });
        });
      });
    })

    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

exports.getStatus = (req, res, next) => {
  const userId = ObjectId(req.userId);

  User.findOne({ _id: ObjectId(userId) })
    .then((user) => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'User status fetched.',
        userStatus: user.status,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateStatus = (req, res, next) => {
  const userId = ObjectId(req.userId);

  User.findOne({ _id: ObjectId(userId) })
    .then((user) => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }

      user.status = req.body.newStatus;
      user.save();
      return res.status(200).json({
        message: 'User status updated.',
        userStatus: user.status,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
