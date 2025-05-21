const express = require("express");
const app = express();
const users = require("./routes/user.js")
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
app.use(cookieParser("secretcode"));


app.get("/getsignedcookie",(req,res)=>{
    res.cookie("madi_in","India",{signed: true});
    res.send("Signed cookie send ");
});

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("Verified");
})
app.get("/greet", (req,res)=>{
    let {name = "anonymous"} = req.cookies;
    res.send(`Hii ${name}`);
})

app.get("/getcookies",(req,res)=>{
    res.cookie("greet","namaste");
    res.cookie("madeIn","india");
  res.send("Send you some cookies");
});
app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send("I am root");
})
app.use("/users",users);
app.use("/posts",posts);


app.listen(3000,()=>{
    console.log("Server is listenig to 3000");
});