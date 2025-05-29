const express = require("express");
const router  = express.Router();
const Listing = require("../models/listing.js"); 
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");



//index route
router.get("/",wrapAsync(async (req,res,next)=>{
const allListings =  await Listing.find({});
res.render("listings/index.ejs",{allListings});  
}));


//new route
router.get("/new",isLoggedIn,(req,res)=>{
  res.render("listings/new.ejs");
});

//sghow routte
router.get("/:id", wrapAsync(async (req, res,next) => {
 let {id} = req.params;
 const list = await Listing.findById(id).populate({path : "reviews" , populate:{path: "author"},}).populate("owner");
  //  console.log(list);
 if(!list){
  req.flash("error","Listing you requested for does not exist!");
  return res.redirect("/listings");
 }
 console.log(list);
 res.render("listings/show.ejs",{list});
}));


//create route
router.post("/",isLoggedIn,validateListing,wrapAsync(async (req,res,next)=>{
   const { listing } = req.body;
    const newListing = new Listing({
        ...listing,
        image: {
            url: listing.image, 
            filename: "default", 
        },
        owner : req.user._id
    });
    await newListing.save();
    req.flash("success","New Listing Created!");
  res.redirect("/listings");
}));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async (req,res,next)=>{
  let {id} = req.params;
  const list = await Listing.findById(id);
   if(!list){
  req.flash("error","Listing you requested for does not exist!");
  return res.redirect("/listings");
 }
  res.render("listings/edit.ejs",{list});
}));

//update route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async (req,res,next)=>{
let {id} = req.params;
const {listing} = req.body;
const update = {
  ...listing,
  image:{
    url:listing.image,
  }
};

await Listing.findByIdAndUpdate(id,update);
  req.flash("success","Listing Updated!");
 res.redirect(`/listings/${id}`);
}));

//delete roure
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req,res,next)=>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted!")
  res.redirect("/listings");
}));

module.exports = router;