const express = require("express");
const router = express.Router();
const Profile = require("../Models.js")

router.get("", async function(req,res){
    
    //router.set("view engine", "ejs");
    router.use(express.static(__dirname + "/views"))

    var { email } = require("./signin-post");
    const find = await Profile.find({ email: email });
    var account = find[0];
    //console.log(account);
    //res.render("profile",{name:"account.name", email : "account.email", arr:[]});
    res.render("profile",{name:account.name, email : account.email, arr:account.arr,id : account.ind});
});

module.exports = router;
