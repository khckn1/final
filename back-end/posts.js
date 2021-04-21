const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();

router.use(jsonParser); // use it globally
// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/cp5', {
  useNewUrlParser: true
});

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

const postSchema = new mongoose.Schema({
  user: mongoose.Schema.ObjectId,
  title: String,
  images: Array,
  text: Array,
  created: {
    type: Date,
    default: Date.now
  },
});

const Post = mongoose.model('Post', postSchema);

router.post('/', validUser, async (req, res) => {
  const post = new Post({
    user: req.session.userID,
    title: req.body.title,
    images: req.body.images,
    text: req.body.text,
  });
  try {
    await post.save();
    res.send(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/', async (req, res) => {
  try {
    let posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// get a post
router.get("/user/:id", validUser, async (req, res) => {
  // return post
  try {
    let post = await Post.find({
      user: req.session.userID,
    })
    return res.send(post);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
	try {
		await Post.deleteOne({
			_id: req.params.id
		});
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// get a post
router.get("/:id", async (req, res) => {
  // return post
  try {
    let post = await Post.findOne({
      _id: req.params.id
    }).sort({
      created: -1
    }).populate('user');

    return res.send(post);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
	try {
		let post = await Post.findOne({
			_id: req.params.id
		});
    post.title = req.body.title;
    post.text = req.body.text;
		await post.save()
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

module.exports = {
  model: Post,
  routes: router,
}
