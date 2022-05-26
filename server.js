require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer');
const fs = require('fs');
const { stringify } = require('querystring');
const server = require('http').Server(app);
const flash = require('express-flash');
const cors = require('cors');
const User = require('./models/user');
const MongoDbStore = require('connect-mongo')
var $           = require('jquery');  // for ajax

const storage = multer.diskStorage({
    // destination for files
    destination: function (req, file, cb) {
        const userName = `./public/uploads/images/${req.body.name}`;
        if(!fs.existsSync(userName)){
            fs.mkdirSync(userName);
        }
        cb(null, `public/uploads/images/${req.body.name}`)
    },


    //add back for extension
     filename: function (req, file, cb) {   
        //  cb.forEach(element => {
        //      let i = 0;
        //      i++;
        //  });
        cb(null, '1.jpg' );
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3,
    }
 });


const db = 'mongodb+srv://akshat:test1234@cluster0.zvetd.mongodb.net/meals?retryWrites=true&w=majority'
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


let store = new MongoDbStore({
    mongoUrl: db,
    collectionName: 'sessions'
});

// // Session configdd

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 24 hours
    }
}));

app.use(flash());

//set the path of the jquery file to be used from the node_module jquery package  
app.use('/jquery',express.static('/node_modules/jquery/dist/'), (req, res) => {
    res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
    console.log('jquery loaded');
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

require('./routes/web')(app);

app.get('/register', (req, res) => {
    res.render('registration1.ejs');
})


app.post('/meals', upload.single('image'), (req, res) => {
    console.log(req.file);
    const { name, email } = req.body;
    const image = req.file.path;
    const newUser = new User({
        name,
        email,
        image
    });
    newUser.save()
        .then(item => res.render('meals.ejs', {meals:item}))
        .catch(err => console.log(err));
});



// const axios = require("axios");

// const options = {
//   method: 'POST',
//   url: 'https://d7-verify.p.rapidapi.com/send',
//   headers: {
//     'content-type': 'application/json',
//     Authorization: '972375nfegdmd82sjsdbdfs524',
//     'X-RapidAPI-Host': 'd7-verify.p.rapidapi.com',
//     'X-RapidAPI-Key': 'e1aafd7c08mshc87325170274bddp15ec80jsncbe9a9fafec8'
//   },
//   data: '{"expiry":900,"message":"Your otp code is {code}","mobile":971562316353,"sender_id":"SMSInfo"}'
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// const verifyOtp = {
//     method: 'POST',
//     url: 'https://d7-verify.p.rapidapi.com/verify',
//     headers: {
//       'content-type': 'application/json',
//       Authorization: '972375nfegdmd82sjsdbdfs524',
//       'X-RapidAPI-Host': 'd7-verify.p.rapidapi.com',
//       'X-RapidAPI-Key': 'e1aafd7c08mshc87325170274bddp15ec80jsncbe9a9fafec8'
//     },
//     data: '{"otp_code":"606603","otp_id":"348218b6-5eef-425b-9800-8a0b689e7279"}'
//   };
  
//   axios.request(verifyOtp).then(function (response) {
//       console.log(response.data);
//   }).catch(function (error) {
//       console.error(error);
//   });


const nodemailer = require('nodemailer');

var email;

var otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);
console.log(otp);

let transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'iitianakshatsinghal@gmail.com',
        pass: 'akrikkuthegreat',
    }
});

app.post('/send',function(req,res){
    email = 'akshatsinghal0313@gmail.com';
    console.log(email);
    
    var mailOptions = {
        to : email,
        subject : 'OTP',
        text : 'Your OTP is ' + otp
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    res.render('otp.ejs');
                    }
                    });
});

app.post('/verify',function(req,res){
    if(req.body.otp == otp){
        res.send('succesfully verified');
    }
    else{
        res.send('not verified');
        }
});



server.listen( process.env.PORT || 5000)