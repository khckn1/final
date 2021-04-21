const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

router.use(jsonParser); // use it globally

const cookieParser = require("cookie-parser");
router.use(cookieParser());

const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['secretValue'],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/cp5', {
  useNewUrlParser: true
});

const commentSchema = new mongoose.Schema({
  firstName: '',
  lastName: '',
  text: '',
  post: mongoose.Schema.ObjectId,
});

const Comment = mongoose.model('Comment', commentSchema);
// upload photo
router.post("/", validUser, async (req, res) => {
  console.log(req.body.post);
  const comment = new Comment({
    text: req.body.text,
    post: req.body.post,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  try {
    await comment.save();
    return res.send(comment);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// router.get('/', async (req, res) => {
//   try {
//     let comments = await Comment.find();
//     res.send(comments);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

// get a post
router.get("/post/:id", validUser, async (req, res) => {
  // return post
  try {
    let comments = await Comment.find({
      post: req.params.id
    }).sort({
      created: -1
    }).populate('user');
    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


module.exports = {
  model: Comment,
  routes: router,
}
