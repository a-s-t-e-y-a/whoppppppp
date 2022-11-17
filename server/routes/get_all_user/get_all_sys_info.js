const express = require("express");
const prisma = require("../../helper/prisma.js");
const sysRoute = express.Router();
sysRoute.get("/sys", async (req, res) => {
  const sys = await prisma.sys_info.findMany();
  res.status(200).json({
    message: "scussfully loggin all the details",
    data: sys,
  });
});
module.exports = sysRoute;
