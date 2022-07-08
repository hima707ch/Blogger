const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://hima707ch:7073928944@himanshu.rdk9j5d.mongodb.net/Blogger?retryWrites=true&w=majority",{useNewUrlParser : true});
//mongoose.connect("mongodb://localhost:27017/Blogger",{useNewUrlParser : true});


// Moongoose frame

const frame = mongoose.Schema({
    ind : Number,
    name: String,
    email: String,
    pass1: String,
    pass2: String,
    arr : Array

});
// Moongoose  tabel = Profile     collection = profiles
const Profile = mongoose.model("profiles", frame);

module.exports = Profile;  //mongoose.model("Profiles", frame);
