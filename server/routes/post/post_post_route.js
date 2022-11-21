const express = require("express");
const postRoute = express.Router();
const { postController } = require("./post_post_controller.js");
postRoute.post("/api/post", postController);
module.exports = postRoute;
