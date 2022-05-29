// Getting all the required modules
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const fs = require("fs");
const { stringify } = require("querystring");
const server = require("http").Server(app);
const flash = require("express-flash");
const cors = require("cors");
const User = require("./models/user");
const MongoDbStore = require("connect-mongo");
var $ = require("jquery"); // for ajax

// Using multer to upload image files that will be uploaded by the user while registering
const storage = multer.diskStorage({
  // destination for files
  destination: function (req, file, cb) {
    // It will crate a folder with user name and store the image in that folder with the use of fs module
    const userName = `./public/uploads/images/${req.body.name}`;
    if (!fs.existsSync(userName)) {
      fs.mkdirSync(userName);
    }
    cb(null, `public/uploads/images/${req.body.name}`);
  },

  //add back for extension
  filename: function (req, file, cb) {
    cb(null, "1.jpg");
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

// Connecting to MongoDB using mongoose
// Database created with MongoDB Atlas and connecting to it with the following URL present in the .env file
const db = process.env.MONGO_CONNECTION_URL;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

let store = new MongoDbStore({
  mongoUrl: db,
  collectionName: "sessions",
});

// Session configuration for storing the session data i.e. meals added in the cart by the user in the database
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 24 hours
    },
  })
);

// flash configuration for storing the flash messages in the session
app.use(flash());

//set the path of the jquery file to be used from the node_module jquery package
app.use("/jquery", express.static("/node_modules/jquery/dist/"), (req, res) => {
  res.sendFile(__dirname + "/node_modules/jquery/dist/jquery.min.js");
  console.log("jquery loaded");
});

// cors configuration for allowing the cross origin resource sharing
app.use(cors());

// urlencoded configuration for parsing the data from the form
app.use(express.urlencoded({ extended: true }));

// creating static folder
app.use(express.static("public"));

app.use(express.json());

//Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// connecting the routes to the server
require("./routes/web")(app);

// animation post route which will be used to upload the image files after the register page is submitted using multer
app.post("/animation", upload.single("image"), (req, res) => {
  console.log(req.file);
  const { name, email } = req.body;
  const image = req.file.path;
  const newUser = new User({
    name,
    email,
    image,
  });
  newUser.save().then(res.render("animation.ejs"));
});

// error handling middleware
app.use(function (req, res) {
  res.status(404).render("error.ejs");
});

// server listening
server.listen(process.env.PORT || 5000);
