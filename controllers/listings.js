const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


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
 let response = await  geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send();

  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, ".." , filename);
   const { listing } = req.body;
    const newListing = new Listing({
        ...listing,
        image: {
            url: url, 
            filename: filename, 
        },
        owner : req.user._id,
        geometry :response.body.features[0].geometry,
    });
   let savedListing =  await newListing.save();
   console.log(savedListing);
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

 let originalImageUrl = list.image.url;
 originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_250,blur:300");
  res.render("listings/edit.ejs",{list,originalImageUrl});
};

module.exports.updateListing = async (req,res,next)=>{
  let {id} = req.params;
  let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

  if(typeof req.file !== "undefined"){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = {url,filename};
  await listing.save();
  }
  req.flash("success","Listing Updated!");
 res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res,next)=>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted!")
  res.redirect("/listings");
};