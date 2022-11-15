const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
async function login_controller(req, res) {
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  // check if user exist or not
  if (!user) {
    res.status(401).json({
      message: "User not found enter valid credentials",
    });
  }

  bcrypt.compare(password, user.password, (err, res) => {
    if (err) {
      res.status(400).json({
        messgae: "Some error ocuured",
      });
    }
    if (res == true) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        algorithm: "RS256",
      });
      res.status(200).json({
        message: "You login scussefully",
        data: user,
        token: token,
      });
    } else {
      res.status(400).json({
        message: "Enter valid credentials",
      });
    }
  });
}
module.exports = { login_controller };
