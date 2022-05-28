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

const storage = multer.diskStorage({
  // destination for files
  destination: function (req, file, cb) {
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

const db = process.env.MONGO_CONNECTION_URL;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

let store = new MongoDbStore({
  mongoUrl: db,
  collectionName: "sessions",
});

 // Session configdd

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

app.use(flash());

//set the path of the jquery file to be used from the node_module jquery package
app.use("/jquery", express.static("/node_modules/jquery/dist/"), (req, res) => {
  res.sendFile(__dirname + "/node_modules/jquery/dist/jquery.min.js");
  console.log("jquery loaded");
});

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(express.json());

//Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

require("./routes/web")(app);

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

app.use(function (req, res) {
  res.status(404).render("error.ejs");
});

server.listen(process.env.PORT || 5000);
