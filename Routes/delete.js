const express = require("express");
const router = express.Router();
const bodyParse = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
const Profile = require("../Models.js")



module.exports = async function (req, res) {

    const app = express();
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/views"))

    var post = 0;

    var { email } = require("./signin-post");
    const find = await Profile.find({ email: email });
    var account = find[0];

    var array = account.arr;


    var array2 = []
    
    array.forEach(function(item){
        if(item.arr_id!= req.params.page) { array2.push(item); }
       
    })


    console.log(array2);

    await Profile.updateOne({ email: account.email }, {$set : { arr : array2 } })

    res.redirect("/profile/" + email);
   
    res.end();
}

//module.exports.page = router;