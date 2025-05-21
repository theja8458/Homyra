const express = require("express");
const router = express.Router();



// index - Posts
router.get("/",(req,res)=>{
    res.send("Get for  Posts");
})

//Show 
router.get("/:id",(req,res)=>{
    res.send("Get for Post id");
});

//Create 
router.post("/",(req,res)=>{
    res.send("Post for posts");
});

//Delete
router.delete("/:id",(req,res)=>{
    console.log("DElete for Post");
});


module.exports = router;