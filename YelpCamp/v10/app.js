var express                 =require("express"),
    app                     =express(),
    bodyParser              =require("body-parser"),
    mongoose                =require("mongoose"),
    passport                =require("passport"),
    LocalStrategy           =require("passport-local"),
    passportLocalMongoose   =require("passport-local-mongoose"),
    methodOverride          =require("method-override"),
    seedDB                  =require("./seeds"),
    Campground              =require("./models/campground"),
    Comment                 =require("./models/comment"),
    User                    =require("./models/user");
    
    
    var commentRoutes       = require("./routes/comments"),
        campgroundsRoutes   = require("./routes/campgrounds"),
        indexRoutes         = require("./routes/index");
 
    
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

//  seedDB(); //seed bd off

//PASSPORT CONFIGURATION
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

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds" ,campgroundsRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp Server Has Started!");
});