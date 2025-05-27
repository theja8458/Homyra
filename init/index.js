const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const monogUrl = 'mongodb://127.0.0.1:27017/wonderlust';



main().then(()=>{
  console.log("Connceted to DB");
}).catch(err=>{
    console.log(err);
});

async function main(){
  await mongoose.connect(monogUrl);
};

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
      ...obj,owner: "6832bef663ddba932e1b212e",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialize");

};

initDB();