const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../../helper/prisma.js");
async function login_controller(req, res) {
  const { username, password } = req.body;
  console.log(req.body);
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  // check if user exist or not
  if (!user) {
    return res.status(401).json({
      message: "User not found enter valid credentials",
    });
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(400).json({
        messgae: "Some error ocuured",
      });
    }
    if (result == true) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return res.status(200).json({
        message: "You login scussefully",
        data: user,
        token: token,
      });
    } else {
      return res.status(400).json({
        message: "Enter valid credentials",
      });
    }
  });
}
module.exports = { login_controller };
