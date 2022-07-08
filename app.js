const express = require("express");
const bodyParse = require("body-parser");
const ejs = require("ejs");
var cors = require('cors');

const home = require("./Routes/home-post");
const Profile = require("./Models.js")
var {router} = require("./Routes/signin-post");
const {router3} = require("./Routes/profile-post");
const {page} = require("./Routes/page");
const signin = require("./Routes/signin-get");
const homeG = require("./Routes/home-get");
const profileG = require("./Routes/profile-get")
const delet = require("./Routes/delete")


// Initializing Packs
const app = express();
app.use(bodyParse.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"))
app.use(cors())

// Post Routes
app.use("/",home);
app.use("/sign-in",router);
app.use("/profile/:acc",router3);

// Get Routes
app.use("/profile/:acc", profileG);
app.get("/profile/:acc/:page",page);
app.get("/profile/:acc/:page/delete",delet);

app.use("/sign-in",signin);
app.use("/",homeG);



//Port
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running at port 3000 ");
})