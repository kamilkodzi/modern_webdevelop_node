var express                 = require("express"),
    app                     =express(),
    bodyParser              =require("body-parser"),
    mongoose                =require("mongoose"),
    passport                =require("passport"),
    LocalStrategy           =require("passport-local"),
    passportLocalMongoose   =require("passport-local-mongoose"),
    seedDB                  =require("./seeds"),
    Campground              =require("./models/campground"),
    Comment                 =require("./models/comment"),
    User                    =require("./models/user");
    
    
    
    
    mongoose.connect("mongodb://localhost/yelp_camp_v6");

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

seedDB();

//PASSPORT CONFIGURATION                     <-------------------- GDZIES TU BLAD 
app.use(require('express-session')({ 
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

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

app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    // fijnd campground by ID
    Campground.findById(req.params.id,function(err,campground){
      if(err){
          console.log(err);
      }else{
          res.render("comments/new",{campground:campground});
      }  
    });
});


app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
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


//AUTH ROUTES

//show regrister form
app.get("/register",function(req,res){
   res.render("register"); 
});

app.post("/register",function(req,res){
    var newUser= new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

//show login form
app.get("/login",function(req,res){
    res.render("login");
});

app.post("/login",passport.authenticate("local",
                                            {
                                                successRedirect:"/campgrounds",
                                                failureRedirect:"/login"
                                            }), function(req,res){
});



//LOG OUT ROUTE
app.get("/logout",function(req,res){
   req.logout();
   res.redirect("/campgrounds");
});


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp Server Has Started!");
});