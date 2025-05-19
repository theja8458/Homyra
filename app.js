const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const monogUrl = 'mongodb://127.0.0.1:27017/wonderlust';
const Listing = require("./models/listing.js"); 

const ejsMate = require("ejs-mate");
const path = require("path");
const methodOverride = require("method-override");
const { url } = require("inspector");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const Review = require("./models/review.js"); 




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

//Index route
// app.get("/testlisting",async (req,res)=>{
//   let sampleListing = new Listing({
//       title:"My new villa",
//       description:"By the beach",
//       price:1200,
//       location:"Goa",
//       country:"India"
//   });

//   await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Succesful tested");

// });

const validateListing = (req,res,next)=>{
  let {error} =  listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400,errMsg);
    }else{
      next();
    }
}


//index route
app.get("/listings",wrapAsync(async (req,res,next)=>{
const allListings =  await Listing.find({});
res.render("listings/index.ejs",{allListings});  
}));

app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
});

//sghow routte
app.get("/listings/:id", wrapAsync(async (req, res,next) => {
 let {id} = req.params;
 const list = await Listing.findById(id);
 res.render("listings/show.ejs",{list});
}));


//create route
app.post("/listings",validateListing,wrapAsync(async (req,res,next)=>{
   const { listing } = req.body;
    const newListing = new Listing({
        ...listing,
        image: {
            url: listing.image, 
            filename: "default", 
        }
    });
    await newListing.save();
  res.redirect("/listings");
}));

//edit route
app.get("/listings/:id/edit",wrapAsync(async (req,res,next)=>{
  let {id} = req.params;
  const list = await Listing.findById(id);
  res.render("listings/edit.ejs",{list});
}));

//update route
app.put("/listings/:id",validateListing,wrapAsync(async (req,res,next)=>{
let {id} = req.params;
const {listing} = req.body;
const update = {
  ...listing,
  image:{
    url:listing.image,
  }
};
await Listing.findByIdAndUpdate(id,update);
 res.redirect(`/listings/${id}`);
}));

//delete roure
app.delete("/listings/:id",wrapAsync(async (req,res,next)=>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));


//Reviews
// post
app.post("/listings/:id/review",async (req,res)=>{
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing._id}`);
});

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