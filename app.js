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

app.get("/", (req,res)=>{
 res.send("Root");
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