const express = require("express");
const router = express.Router();
const bodyParse = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const Profile = require("../Models.js")


module.exports.page =  async function (req, res) {

    const app = express();
    //app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/views"))

    var post = 0;

    var { email } = require("./signin-post");
    const find = await Profile.find({ email: email });
    var account = find[0];

    var array2 = account.arr;

   // console.log(array2);

    for(var i=0;i<array2.length;i++)
    {
        if(array2[i].arr_id == req.params.page) { post = array2[i]; }
        //console.log( array2[i].arr_id +" "+ req.params.page );
    }

    //console.log("ram");
    if (post !== 0) {
        res.render("post-page", { title: post.title, text: post.text });
    }
    
    res.end();
};

//module.exports.page = router;