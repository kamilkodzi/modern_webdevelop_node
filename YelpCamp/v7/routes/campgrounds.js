var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");

//INDEX
router.get("/",function(req,res){
//GET ALL campgrounds form DB

Campground.find({},function(err,allCampgrounds){
   if(err){
       console.log(err);
   } else{
        res.render("campgrounds/index",{campgrounds:allCampgrounds});
   }
});        
        
        
   
});

//CREATE
router.post("/", function(req,res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image= req.body.image;
    var desc= req.body.description;
    var newCampground={name: name, image:image,description:desc};
    //Create new campground and save to DB
    Campground.create(newCampground,function(err,newlyCreated){
       if(err){
           console.log(err);
       } else{
          //redirect back to campgrounds page
          res.redirect("/campgrounds"); 
       }
    });
    
});

//NEW
router.get("/new",function(req,res){
    res.render("campgrounds/new");
});


// SHOW - shows more info about one campgrounds
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log("We have error");
            console.log(req.params.id);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});


module.exports=router;