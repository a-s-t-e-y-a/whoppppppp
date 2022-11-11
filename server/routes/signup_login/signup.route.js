const app = require("express");
const signup_route = app.Router();
const { signup_controller } = require("./signup_controller");
signup_route.get("/signup", signup_controller);
module.exports = signup_route;
