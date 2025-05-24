const express = require("express");
const router  = express.Router();
const Listing = require("../models/listing.js"); 
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");


const validateListing = (req,res,next)=>{
  let {error} =  listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400,errMsg);
    }else{
      next();
    }
};

//index route
router.get("/",wrapAsync(async (req,res,next)=>{
const allListings =  await Listing.find({});
res.render("listings/index.ejs",{allListings});  
}));

router.get("/new",(req,res)=>{
  res.render("listings/new.ejs");
});

//sghow routte
router.get("/:id", wrapAsync(async (req, res,next) => {
 let {id} = req.params;
 const list = await Listing.findById(id).populate("reviews");
 if(!list){
  req.flash("error","Listing you requested for does not exist!");
  return res.redirect("/listings");
 }
 res.render("listings/show.ejs",{list});
}));


//create route
router.post("/",validateListing,wrapAsync(async (req,res,next)=>{
   const { listing } = req.body;
    const newListing = new Listing({
        ...listing,
        image: {
            url: listing.image, 
            filename: "default", 
        }
    });
    await newListing.save();
    req.flash("success","New Listing Created!");
  res.redirect("/listings");
}));

//edit route
router.get("/:id/edit",wrapAsync(async (req,res,next)=>{
  let {id} = req.params;
  const list = await Listing.findById(id);
   if(!list){
  req.flash("error","Listing you requested for does not exist!");
  return res.redirect("/listings");
 }
  res.render("listings/edit.ejs",{list});
}));

//update route
router.put("/:id",validateListing,wrapAsync(async (req,res,next)=>{
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
router.delete("/:id",wrapAsync(async (req,res,next)=>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted!")
  res.redirect("/listings");
}));

module.exports = router;