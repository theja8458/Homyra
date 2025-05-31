const Listing = require("../models/listing");

module.exports.index = async (req,res,next)=>{
const allListings =  await Listing.find({});
res.render("listings/index.ejs",{allListings});  
};

module.exports.renderNewForm = (req,res)=>{
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res,next) => {
 let {id} = req.params;
 const list = await Listing.findById(id).populate({path : "reviews" , populate:{path: "author"},}).populate("owner");
  //  console.log(list);
 if(!list){
  req.flash("error","Listing you requested for does not exist!");
  return res.redirect("/listings");
 }
//  console.log(list);
 res.render("listings/show.ejs",{list});
};

module.exports.createListing = async (req,res,next)=>{
  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, ".." , filename);
   const { listing } = req.body;
    const newListing = new Listing({
        ...listing,
        image: {
            url: url, 
            filename: filename, 
        },
        owner : req.user._id
    });
    await newListing.save();
    req.flash("success","New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res,next)=>{
  let {id} = req.params;
  const list = await Listing.findById(id);
   if(!list){
  req.flash("error","Listing you requested for does not exist!");
  return res.redirect("/listings");
 }
  res.render("listings/edit.ejs",{list});
};

module.exports.updateListing = async (req,res,next)=>{
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
};

module.exports.destroyListing = async (req,res,next)=>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted!")
  res.redirect("/listings");
};