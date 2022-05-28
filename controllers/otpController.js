require("dotenv").config();
const nodemailer = require("nodemailer");
const User = require('../models/user');
var email;

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

function otpController() {
  return {
    send(req, res) {
      const name = req.params.name;
      console.log(name);
      User.find({ name: name }, function (err, user) {
        if (err) console.log(err);
        console.log(user[0].email);

        email = user[0].email;
        console.log(email);

        var mailOptions = {
          to: email,
          subject: "OTP",
          text: "Your OTP for payment of ordered meals is " + otp + "Don't share this with anyone.",
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
            res.render("otp.ejs");
          }
        });
      });
    },

    verify(req, res) {
      if (req.body.otp == otp) {
        res.render("thank.ejs");
      } else {
        res.render("error.ejs");
      }
    },
  };
}

module.exports = otpController;
