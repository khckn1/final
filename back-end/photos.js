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

const photoSchema = new mongoose.Schema({
  path: String,
  title: String,
});

const Photo = mongoose.model('Photo', photoSchema);

// upload photo
router.post("/", validUser, upload.single('photo'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const photo = new Photo({
    user: req.user,
    path: "/images/" + req.file.filename,
    title: req.body.title,
  });
  try {
    await photo.save();
    res.send({
      path: "/images/" + req.file.filename
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: Photo,
  routes: router,
}
