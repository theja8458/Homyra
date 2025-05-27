const express = require("express");
const router  = express.Router();
const User = require("../models/user.js"); 
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/signup",wrapAsync(async (req,res)=>{
    try{
     let{username,password,email} = req.body;
     const newUser = new User({username , email});
     const result = await User.register(newUser,password)
     console.log(result);
     req.login(result , (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wonderlust");
        res.redirect("/listings");
     })
    }catch(err){
       req.flash("error",err.message);
       res.redirect("/signup");
    };
}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",saveRedirectUrl,passport.authenticate("local" ,{failureRedirect: "/login" , failureFlash: true }), async (req,res)=>{
     req.flash("success","Welcome back to Wonderlust!");
     let redirectUrl = res.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl);

});

router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    });
});





module.exports = router;