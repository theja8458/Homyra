const express = require("express");
const router = express.Router();




// router.get("/",(req,res)=>{
//     res.send("I am root");
// });

// index - users
router.get("/",(req,res)=>{
    res.send("Get for users");
})

//Show 
router.get("/:id",(req,res)=>{
    res.send("Get for users id");
});

//Create 
router.post("/",(req,res)=>{
    res.send("Post for users");
});

//Delete
router.delete("/:id",(req,res)=>{
    console.log("DElete for users");
});


module.exports = router;