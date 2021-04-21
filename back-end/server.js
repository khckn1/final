const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const router = express.Router();
// setup express
const app = express();


// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

// import the posts module and setup its API path
const posts = require("./posts.js");
app.use("/api/posts", posts.routes);

const photos = require("./photos.js");
app.use("/api/photos", photos.routes);

const comments = require("./comments.js");
app.use("/api/comments", comments.routes);

app.listen(3002, () => console.log('Server listening on port 3002!'));
