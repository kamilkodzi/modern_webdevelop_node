var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");
var multer      = require('multer');


var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFilter});

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'kamilkodzi', 
  api_key: "****************", 
  api_secret: "**************"
});


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



router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res) {
cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
  console.log(req.file);
   console.log(req.file.path);
  req.body.campground.image = result.secure_url;
  req.body.campground.cloudId= result.public_id;
  console.log(result);
  // add author to campground
  req.body.campground.author = {
    id: req.user._id,
    username: req.user.username
  };
  Campground.create(req.body.campground, function(err, campground) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('back');
    }
    res.redirect('/campgrounds/' + campground.id);
  });
});
});




//NEW
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});


// SHOW - shows more info about one campgrounds
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err || !foundCampground){
            req.flash("error","Campground not found");
            res.redirect("back");
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});


//EDIT CAMBGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                console.log("blad");
            }else{
             res.render("campgrounds/edit",{campground:foundCampground});   
            }
        });
});

//UPDATE CAMBGROUND ROUTE
router.put("/:id",function(req,res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
      if(err){
          res.redirect("/campgrounds");
      }else{
          res.redirect("/campgrounds/"+req.params.id);
      }
    });
    //redirect somewhere (show page)
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log("nowa funkcja cloudinary");
        }
    
    Campground.findByIdAndRemove(req.params.id,function(err){
      if(err){
          res.redirect("/campgrounds");
      } else{
          cloudinary.uploader.destroy(foundCampground.cloudId, function(result) { console.log(result) });
          res.redirect("/campgrounds");
      }
    });
});
});

module.exports=router;