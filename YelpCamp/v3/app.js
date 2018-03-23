var express = require("express"),
    app = express(),
    bodyParser=require("body-parser"),
    mongoose = require("mongoose"),
    Campground=require("./models/campground"),
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
        res.render("index",{campgrounds:allCampgrounds});
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
    res.render("new.ejs");
});


// SHOW - shows more info about one campgrounds
app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log("We have error");
            console.log(req.params.id);
        }else{
            console.log(foundCampground);
            res.render("show",{campground:foundCampground});
        }
    });
});





app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp Server Has Started!");
});