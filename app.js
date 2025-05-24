const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const monogUrl = 'mongodb://127.0.0.1:27017/wonderlust';

const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const { url } = require("inspector");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");

const reviews = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");


main().then(()=>{
  console.log("Connceted to DB");
}).catch(err=>{
    console.log(err);
});


async function main(){
  await mongoose.connect(monogUrl);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
   expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
   maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true
  },
};

app.get("/", (req,res)=>{
 res.send("Root");
});


app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


app.use("/listings",listings);
app.use("/listings/:id/review",reviews);


app.use((req,res,next)=>{
   next(new ExpressError(404, "Page not found!"));
});


//error middleare
app.use((err,req,res,next)=>{
   const { status = 500, message = "Something went wrong" } = err;
   res.status(status).render("error.ejs",{message});
  // res.status(status).send(message);
});

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`);
});