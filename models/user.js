const mongoose = require("mongoose");
const { use } = require("passport");
const Schema = mongoose.Schema;
const passportLocalMangoose = require("passport-local-mongoose"); 

const userSChema = new Schema({
    email:{
    type: String,
    required: true,
    },

});

userSChema.plugin(passportLocalMangoose);

module.exports = mongoose.model("User",userSChema);