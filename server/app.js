const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// require all kinds of routes here

const signup_route = require("./routes/signup_login/signup.route");
const getRoute = require("./routes/get_all_user/get_all_user.js");
const sysRoute = require("./routes/get_all_user/get_all_sys_info.js");
const login_route = require("./routes/signup_login/login.route.js");
const postRoute = require("./routes/post/post_post_route");
app.use(
  cors({
    origin: "http://localhost:8000",
  })
);

// using all kinds of routes in the system

app.use(bodyParser.json());
app.use(express.json());

// using all routes here
app.use(signup_route);
app.use(sysRoute);
app.use(login_route);
app.use(getRoute);
app.use(postRoute);
module.exports = app;
