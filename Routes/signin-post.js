const express = require("express");
const router = express.Router();
const Profile = require("../Models.js")
const bodyParse = require("body-parser");

const app = express();
app.use(bodyParse.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"))


var account = {};

router.post("", async function (req, res) {
    const email = req.body.email;
    const pass = req.body.pass1;

    if(email == "" || pass == "") {
        res.render("sign in",{status:"Try Again"})
    }  
    else {
    const find = await Profile.find({ email: email });
   
    if (find.length>0 && find[0].pass1 == pass)
    { 
        account = find[0];
        res.redirect("/profile/"+email);
        module.exports.account = account;
        module.exports.email = email;
}
    else 
    {
        res.render("sign in",{status:"Try Again"})
    }   
}
});

module.exports.router = router;