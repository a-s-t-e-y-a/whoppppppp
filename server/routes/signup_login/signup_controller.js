const { phoneLookup } = require("phone-number-lookup");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const prisma = require("../../helper/prisma");
async function signup_controller(req, res) {
  const { email, password, phone, username } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  console.log(user);
  console.log(req.body);
  if (email || password || phone || username) {
    return res.status(404).json({
      error: "Enter all details",
    });
  } else if (validator.validate(email)) {
    return res.status(401).json({
      error: "Email enterd is not correct",
    });
  } else if (phoneLookup(["+91" + phone])[0].name == "") {
    return res.status(401).json({
      error:
        "Either you not enter country code or your phone no is entered incorrectly",
    });
  } else if (user) {
    return res.status(401).json({
      error: "Something is not good",
    });
  } else {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: "Some internal error ocurred we are very sorry",
        });
      }
      const post = await prisma.user.create({
        data: {
          username: username,
          password: hash,
          bio: "",
          phone: phone,
          country: phoneLookup(["+91" + phone])[0].country,
          avatar: "",
          email: email,
        },
      });
      return res.status(200).json({
        message: "User created scussdefully",
        data: post,
      });
    });
  }
}
module.exports = { signup_controller };
