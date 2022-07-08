const express = require("express");
const router = express.Router();
const Profile = require("../Models.js")
const ejs = require("ejs");
const bodyParse = require("body-parser");


router.post("", async function (req, res) {

    var { email } = require("./signin-post");
    const find = await Profile.find({ email: email });
    var account = find[0];

    index = account.ind + 1 ;

    var post = {
        title: req.body.title,
        text: req.body.text,
        arr_id : index
    }

    var array = account.arr;
    
    await array.push(post);

    await Profile.updateOne({ email: account.email }, {$set : {ind:index, arr : array  } }).then((obj) => {
        console.log('Updated - ');
    })
        .catch((err) => {
            console.log('Error: ' + err);
        });

    account = await Profile.findOne({ email: account.email });
    console.log(account.ind);
    module.exports.array = array;

    res.render("profile", { name: account.name, email: account.email, arr: account.arr, id : index })
})

module.exports.router3 = router;