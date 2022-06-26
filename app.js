
// Include Externals Pack

const express = require("express");
const bodyParse = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const lo = require("lodash");


// Initializing packs

const app = express();
app.use(bodyParse.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"))
mongoose.connect("mongodb://localhost:27017/facebook");


// Moongoose frame

const frame = mongoose.Schema({
    name: String,
    email: String,
    pass1: Number,
    pass2: Number,
    arr : Array

});
// Moongoose  tabel = Profile     collection = profiles
const Profile = mongoose.model("profiles", frame);



// Variables
var account;
var arr = [];


// Routing

app.post("/", async function (req, res) {

    var profile = new Profile({
        name: req.body.name,
        email: req.body.email,
        pass1: req.body.pass1,
        pass2: req.body.pass2
    });

    var Find = await Profile.find({ email: req.body.email });

    if (Find.length >= 1) {
        res.render("home", { status: "Email not unique !!" })
    }
    else if (profile.pass1 === profile.pass2) {
        res.render("home", { status: "Password Match Saved Successfully !!" })
        profile.save();
    }
    else {
        res.render("home", { status: "Try again !!" });
    }
});



app.post("/sign-in", async function (req, res) {
    const email = req.body.email;
    const pass = req.body.pass1;

    const find = await Profile.find({ email: email });
   
    if (find.length>0 && find[0].pass1 == pass)
    { 
        account = find[0];
        res.redirect("/profile/"+email);
}
    else 
    {
        res.render("sign in",{status:"Try Again"})
    }    
});



app.post("/profile/:acc",async function(req,res){
    var post = {
    title : req.body.title,
    text : req.body.text
    }
    arr = account.arr;
    await arr.push(post);
    await Profile.updateOne({email:account.email},{arr:arr});
    account = await Profile.findOne({ email:account.email });
    
    res.render("profile",{name:account.name, email : account.email,arr:account.arr})
})



// Get routes

app.get("/profile/:acc",function(req,res){
    res.render("profile",{name:account.name, email : account.email,arr:account.arr})
});

app.get("/profile/:acc/:page",function(req,res){
    var post = 0;
    account.arr.forEach(function(x){
        if(lo.lowerCase(x.title) == lo.lowerCase(req.params.page)){
            post = x;
        }
    });

    if(post!==0) {
        res.render("post-page",{title:post.title,text:post.text});
    }
    res.end();
});

app.get("/", function (req, res) {
    res.render("home", { status: "Enter your details" });
})

app.get("/sign-in", function (req, res) {
    res.render("sign in", { status: "" })
})


//Port
app.listen(3000, function () {
    console.log("Server is running at port 3000 ");
})