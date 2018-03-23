var express = require("express"),
    app = express(),
    bodyParser=require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//SCHEMA SETUP

var campgroundSchema= new mongoose.Schema({
    name: String,
    image: String,
    description: String
    
});

var Campground=mongoose.model("Campground",campgroundSchema);

// Campground.create(
//     {
//         name:"Granite Hill", 
//         image:"https://farm9.staticflickr.com/8311/7930038740_d86bd62a7e.jpg",
//         description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse luctus, metus vitae posuere vehicula, erat ligula euismod lacus, eu consectetur nibh nibh ut dolor. Nunc sodales ex et enim tincidunt rhoncus. Vivamus faucibus efficitur ullamcorper. Suspendisse vel ultricies urna. Aliquam ultricies sed felis at pharetra."
//     },function(err,campground){
//         if(err){
//             console.log(err);
//         }else{
//              console.log("Newly Campground created");
//              console.log(campground);
//         }
//     });
    


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
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log("We have error");
            console.log(req.params.id);
        }else{
            res.render("show",{campground:foundCampground});
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp Server Has Started!");
});