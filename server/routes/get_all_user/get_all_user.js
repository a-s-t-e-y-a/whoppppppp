const express = require("express");
const getRoute = express.Router();
const prisma = require("../../helper/prisma.js");
getRoute.get("/", async (req, res) => {
  const user = await prisma.user.findMany();
  return res.status(200).json({
    message: user,
  });
});
module.exports = getRoute;
