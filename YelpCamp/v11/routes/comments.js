var express     = require("express");
var router      = express.Router({mergeParams:true});
var Campground  = require("../models/campground");
var Comment  = require("../models/comment");
var middleware  = require("../middleware");

//Com new
router.get("/new",middleware.isLoggedIn,function(req,res){
    // fijnd campground by ID
    Campground.findById(req.params.id,function(err,campground){
      if(err){
          console.log(err);
      }else{
          res.render("comments/new",{campground:campground});
      }  
    });
});


router.post("/",middleware.isLoggedIn,function(req,res){
    //lokup campground using ID
     Campground.findById(req.params.id,function(err,campground){
         if(err){
             req.flash("error","Something went wrong");
             console.log(err);
             res.redirect("/campgrounds");
         }else{
             Comment.create(req.body.comment,function(err,comment){
                 if(err){
                     console.log(err);
                 }else{
                     //add username and id to comment
                     comment.author.id=req.user._id;
                     comment.author.username=req.user.username;
                    //save comment
                     comment.save();
                     campground.comments.push(comment._id);
                     campground.save();
                     console.log(comment);
                     req.flash("succes","Succesfully added comment! ;)");
                     res.redirect("/campgrounds/"+campground._id);
                 }
             });
         }
     });
    //create new comment
    //connect new comment to campground
    //redirect to campground show page
    
});

//comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req,res){
    Campground.findById(req.params.id,function(err, foundCampground) {
        if(err || !foundCampground){
            req.flash("error","Cannot find that campground");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            }else{
                res.render("comments/edit",{campground_id: req.params.id,comment:foundComment}); 
        }
    });
});

    
});


//comments update
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//comments delete

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   //findbyIDandremove
   Comment.findByIdAndRemove(req.params.comment_id,function(err){
      if(err){
          res.redirect("back");
      } else{
          res.redirect("/campgrounds/"+req.params.id);
      }
   });
});

module.exports=router;