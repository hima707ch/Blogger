const express = require("express");
const router = express.Router();
const Profile = require("../Models.js")
const ejs = require("ejs");
const bodyParse = require("body-parser");



const app = express();
app.use(bodyParse.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"))



router.post("", async function (req, res) {

    var profile = new Profile({
        ind :0,
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
        await profile.save();
        res.render("home", { status: "Password Match Saved Successfully !!" })
    }
    else {
        res.render("home", { status: "Try again !!" });
    }
});

module.exports = router;