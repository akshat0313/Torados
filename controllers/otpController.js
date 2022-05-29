// Getting all the required modules
require("dotenv").config();
const nodemailer = require("nodemailer");
const User = require('../models/user');
var email;

// generating the OTP
var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

// using nodemailer to send the OTP to the user's email
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
    // for sending the OTP to the recognised user's email
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
    // for verifying the OTP
    verify(req, res) {
      if (req.body.otp == otp) {
        console.log("OTP verified");
        // if the OTP is correct, redirect to the thank.ejs page
        res.render("thank.ejs");
      } else {
        // if the OTP is incorrect, redirect to the error.ejs page
        res.render("error.ejs");
      }
    },
  };
}

// exporting the otpController
module.exports = otpController;
