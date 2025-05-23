const express = require("express");
const app = express();
const users = require("./routes/user.js")
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// const cookieParser = require("cookie-parser");
// app.use(cookieParser("secretcode"));


// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("madi_in","India",{signed: true});
//     res.send("Signed cookie send ");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("Verified");
// })
// app.get("/greet", (req,res)=>{
//     let {name = "anonymous"} = req.cookies;
//     res.send(`Hii ${name}`);
// })

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","namaste");
//     res.cookie("madeIn","india");
//   res.send("Send you some cookies");
// });
// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("I am root");
// })
// app.use("/users",users);
// app.use("/posts",posts);

const sessionOptions = {
    secret: "mysecretcode",
    resave: false,
    saveUninitialized:true,
}


app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
     res.locals.messeges = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    if(name === "anonymous"){
    req.flash("error","user not registered");
    }else{
         req.flash("success","user registered successfully");
    }
    res.redirect("/hello");
   
});

app.get("/hello",(req,res)=>{
   
    res.render("page.ejs" ,{name:req.session.name});
})
// app.get("/test",(req,res)=>{
//   res.send("Test sueccessfull");
// });

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//     req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`you sent a request ${req.session.count} times`);
// });



app.listen(3000,()=>{
    console.log("Server is listenig to 3000");
});