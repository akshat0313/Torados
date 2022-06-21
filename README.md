<h1 align="center">Torados - Microsoft Engage'22
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/480px-Microsoft_logo.svg.png" alt="Logo" width="25" height="25"></h1>



<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/akshat0313/Torados/pulls)


</div>

<p align="center">
 <a target="_blank" href="http://torados.herokuapp.com/">Link to the App</a>
    ·
 <a target="_blank" href="https://youtu.be/2ceYu014fv4">Video Demo</a>
 ·
 <a target="_blank" href="https://drive.google.com/file/d/1m-25XoIR9GMtu-ArgJ9cVvCuJavT8nq7/view?usp=sharing">Presentation</a>
  ·
 <a target="_blank" href="https://www.figma.com/file/NnJl98JgZWPrJVXekB0me7/Torados-Microsoft-Engage'22?node-id=0%3A1">Figma work</a>

</p>

# IMPORTANT -
### Currently the mail sending feature is not working because google has stopped providing that less security feature in gmail accounts from 30th may.

## 📝 Table of Contents

- [About](#about)
- [Agile Methodology](#agile)
- [Getting Started](#getting_started)
- [Future Scope](#future_scope)
- [Usage](#usage)
- [Built Using](#built_using)


## 🧐 About <a name = "about"></a>

* This product is for a meal provider service like dominos,pizza hut,etc.it is a food ordering website in which a customer has to register himself by giving his details including one picture of his face for later recognition purpose and with this registration his Bank account will be linked to the website.Now this website will be kept open in the order counter(displaying all the menu) of that particular meals provider from where a customer can directly select the meals that he wanted to order which will be added to his cart and for the checkout process his face will be scanned and if he is already registered his face will be recognised and an OTP will be sent to his registered email id and after successful entry of OTP, Order will be received and the amount will be automatically deducted from his account and if person is not registered already it will take him to register page for registering first.

### Advantages :-

* This will allow cardless, Qr scanless payment and also from the meals provider site POV no one will be required at the counter to manually add and order meals for the customers.


### Compatible Platforms
Laptops, Desktops and Tablet PCs

## ⛏️ Built Using <a name = "built_using"></a>

#### MVC framework for better structure
* face-api.js - for recognising and detecting face 
* Node js - for backend
* Express - Server framework
* Mongodb - for database
* Multer - for image uploading from client side to server side
* fs - for creating file
* Nodemailer - for sending mail
* Jquery - for Ajax calls at client side


## 🏁 Agile Methodology <a name = "agile"></a>

### What is Agile

Agile is a development methodology adopted today in the software industry. Agile promotes teamwork, flexible procedures, and sle-organizing teams.

### How I Incorporated Agile Methodology During The Development Cycle

SCRUM is a subset of Agile, a framework for developing software. SCRUM takes advantage of different techniques to achieve goals in Agile. SCRUM promotes an iterative model where the planning is performed on a very short term. The basic time working unit is the sprint. SCRUM teams always reason in sprints and their planning is limited to sprints.

* Sprint 1 : Researching about various face recognition techniques which includes OpenCv models, Apis,etc. And deciding tech stalks for my prototype.After reading edititorials and tutorials, finally decided to go with face-api.js for face recognition and node js,express and mongodb for the website.Decided the code structure(MVC framework) and flow of the website.

* Sprint 2 : Started devoloping with the basic knowledge of node js and taking help from youtube tutorials and articles to and build a basic face recognition system using face-api.js.Added database for registering users and storing meals using mongodb and mongoose.Encountered occasional bugs which were debugged timely.

* Sprint 3 : Decided to add otp verification for better security purpose and  for false positive recognition by using nodemailer in node js.Added the error page for bad requests or going to the wrong url and image upload feature using multer.Made changes in Ui and added some animation features to make the flow of website pleasant to users and frequent debugging. 

## 🏁 Getting Started <a name = "getting_started"></a>

To install and run the project on your local system, following are the requirements:

### Prerequisites

Make sure to install the required dependencies via node package manager

```sh
  npm install npm@latest -g
```

### Installing

To  run the application on your local host, perform the following steps:

Run the following commands to start the server side.

* Clone the repo
```sh
  git clone https://github.com/akshat0313/Torados.git
```
* Locate inside the folder
```sh
  cd Torados
```
* Installing required dependcies
```sh
  npm i
```
* Starting the server at [local host](http://localhost:5000/)
```sh
  npm start
```


## 🚀 Future Scope <a name = "future_scope"></a>

* Adding Admin feature for the usage of meals service provider for getting all the stats and ordered meals using node js and addition of admin user in mongodb database.
* Accessing customer account details of the user while registering and checking if it is correct for the same and amount deduction from the linked account after otp verification.Currently it is not implemented as this feature is paid.
* Adding 3D scanner for registration purpose.
* Adding React Js for frontend and linking this with server side.Developed 40% of the [code](https://drive.google.com/file/d/1kOzZW-GaltMdCSYKslR31VXs-wy5xLJH/view?usp=sharing),but not    implemented in the prototype as it is not completed fully 



