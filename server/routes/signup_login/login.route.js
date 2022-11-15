const app = require("express");
const login_route = app.Router();
const { login_controller } = require("./login_controller.js");
login_route.get("/api/login", login_controller);
module.exports = login_route;
