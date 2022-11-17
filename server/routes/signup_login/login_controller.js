const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../../helper/prisma.js");
const os = require("os");
console.log(os.uptime());
async function login_controller(req, res) {
  console.log("new 123");
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

  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) {
      return res.status(400).json({
        messgae: "Some error ocuured",
      });
    }
    if (result == true) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      // getting user sys_info and stored on the database
      const sys_info = await prisma.sys_info.create({
        data: {
          operating_system: os.platform(),
          totalmem: os.totalmem(),
          cpu: os.cpus(),
          freemem: os.freemem(),
          hostname: os.hostname(),
          os_version: os.version(),
          uptime: Math.trunc(os.uptime()),
          ip_address: req.socket.remoteAddress,
          userId: user.id,
          // longitude:
          // latitude:
        },
      });

      return res.status(200).json({
        message: "You login scussefully",
        data: user,
        token: token,
        sys_info: sys_info,
      });
    } else {
      return res.status(400).json({
        message: "Enter valid credentials",
      });
    }
  });
}
module.exports = { login_controller };
