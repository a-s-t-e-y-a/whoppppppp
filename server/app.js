const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// require all kinds of routes here

const signup_route = require("./routes/signup_login/signup.route");
app.use(
  cors({
    origin: "http://localhost:8000",
  })
);
// using all kinds of routes in the system

app.use(signup_route);
app.use(bodyParser.json());
app.use(express.json());
module.exports = app;
