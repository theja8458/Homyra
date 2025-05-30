const User = require("../models/user.js"); 


module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req,res)=>{
    try{
     let{username,password,email} = req.body;
     const newUser = new User({username , email});
     const result = await User.register(newUser,password)
    //  console.log(result);
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
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async (req,res)=>{
     req.flash("success","Welcome back to Wonderlust!");
     let redirectUrl = res.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl);

};

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    });
};