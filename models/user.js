const mongoose = require('mongoose');

const ObjectId = require('mongodb').ObjectId;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,

    default: 'I am new!',
  },
  posts: [],
});

userSchema.methods.addPost = function (post) {
  const updatedPosts = [...this.posts];

  updatedPosts.push({
    postId: ObjectId(post._id),
  });

  this.posts = updatedPosts;

  this.save();
};

module.exports = mongoose.model('User', userSchema);
