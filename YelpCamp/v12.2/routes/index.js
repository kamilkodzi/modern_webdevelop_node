var express     = require("express");
var router      = express.Router();
var User        = require("../models/user");
var passport    = require("passport");
var Campground    = require("../models/campground");


router.get("/",function(req,res){
   res.render("landing");
});

//AUTH ROUTES

//show regrister form
router.get("/register",function(req,res){
   res.render("register"); 
});

router.post("/register",function(req,res){
    var newUser= new User(
        {
            username: req.body.username,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            avatar:req.body.avatar,
            email:req.body.email
        });
    if(req.body.adminCode==="secretcode123"){
        newUser.isAdmin=true;
    }
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message);
            return res.redirect("/register");
        }else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Wellcome to YelpCamp!"+ user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

//show login form
router.get("/login",function(req,res){
    res.render("login");
});


router.post("/login",passport.authenticate("local",
                                            {
                                                successRedirect:"/campgrounds",
                                                failureRedirect:"/login"
                                            }), function(req,res){
});



//LOG OUT ROUTE
router.get("/logout",function(req,res){
   req.logout();
   req.flash("success","Logged you out!");
   res.redirect("/campgrounds");
});

//USERS Profile
router.get("/users/:id", function(req,res){
    
    User.findById(req.params.id, function(err,foundUser){
        
        if(err || !foundUser){
            req.flash("error","No user found");
            res.redirect("/");
        }else{
            console.log(foundUser);
            
            Campground.find().where("author.id").equals(foundUser._id).exec(function(err,campgrounds){
                if(err){
                    req.flash("error","No user found");
                    res.redirect("back");
                }else{
                    res.render("users/show",{user:foundUser, campgrounds:campgrounds});
                }   
            });
        }
    });
});




module.exports=router;