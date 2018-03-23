var express     = require("express");
var router      = express.Router({mergeParams:true});
var Campground  = require("../models/campground");
var Comment  = require("../models/comment");

//Com new
router.get("/new",isLoggedIn,function(req,res){
    // fijnd campground by ID
    Campground.findById(req.params.id,function(err,campground){
      if(err){
          console.log(err);
      }else{
          res.render("comments/new",{campground:campground});
      }  
    });
});


router.post("/",isLoggedIn,function(req,res){
    //lokup campground using ID
     Campground.findById(req.params.id,function(err,campground){
         if(err){
             console.log(err);
             res.redirect("/campgrounds");
         }else{
             Comment.create(req.body.comment,function(err,comment){
                 if(err){
                     console.log(err);
                 }else{
                     campground.comments.push(comment._id);
                     campground.save();
                     res.redirect("/campgrounds/"+campground._id);
                 }
             });
         }
     });
    //create new comment
    //connect new comment to campground
    //redirect to campground show page
    
});

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports=router;