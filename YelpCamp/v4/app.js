var express = require("express"),
    app = express(),
    bodyParser=require("body-parser"),
    mongoose = require("mongoose"),
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    seedDB=require("./seeds");
    
    mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

seedDB();


app.get("/",function(req,res){
   res.render("landing");
});


//INDEX
app.get("/campgrounds",function(req,res){
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
app.post("/campgrounds", function(req,res){
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
app.get("/campgrounds/new",function(req,res){
    res.render("campgrounds/new");
});


// SHOW - shows more info about one campgrounds
app.get("/campgrounds/:id",function(req,res){
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


//===========================================
//C O M M E N T S  R O  U  T E S 
//===========================================

app.get("/campgrounds/:id/comments/new",function(req,res){
    // fijnd campground by ID
    Campground.findById(req.params.id,function(err,campground){
      if(err){
          console.log(err);
      }else{
          res.render("comments/new",{campground:campground});
      }  
    });
});


app.post("/campgrounds/:id/comments",function(req,res){
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

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp Server Has Started!");
});