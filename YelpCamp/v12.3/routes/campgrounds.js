var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");
var multer = require('multer');


var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({fileFilter: imageFilter});

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'XXX', //yes i know i can use env variables- but it`s old project :)
  api_key: "XXX", 
  api_secret: "XXX"
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

// //CREATE
// router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res) {
//     //get data from form and add to campgrounds array
//     var name = req.body.name;
//     var price = req.body.price;
//     var image= req.body.image;
//     var desc= req.body.description;
//     var author={
//       id: req.user._id,
//       username:req.user.username
//     };
//     var newCampground={name: name, price:price,image:image,description:desc, author:author};
//     //Create new campground and save to DB
//     Campground.create(newCampground,function(err,newlyCreated){
//       if(err){
//           console.log(newlyCreated);
//       } else{
//           //redirect back to campgrounds page              <------------------- tutaj skonczylem 
//           res.redirect("/campgrounds"); 
//       }
//     });
    
// });



router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res) {
cloudinary.uploader.upload(req.file.path, function(result) {
  // add cloudinary url for the image to the campground object under image property
  req.body.campground.image = result.secure_url;
  req.body.campground.cloudId= result.public_id;
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