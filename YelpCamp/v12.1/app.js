var express                 =require("express"),
    app                     =express(),
    bodyParser              =require("body-parser"),
    mongoose                =require("mongoose"),
    passport                =require("passport"),
    LocalStrategy           =require("passport-local"),
    passportLocalMongoose   =require("passport-local-mongoose"),
    methodOverride          =require("method-override"),
    seedDB                  =require("./seeds"),
    momentt                 =require('moment'),
    Campground              =require("./models/campground"),
    Comment                 =require("./models/comment"),
    flash                   =require("connect-flash"),
    cloudinary              =require("cloudinary"),
    User                    =require("./models/user");
    
    
    var commentRoutes       = require("./routes/comments"),
        campgroundsRoutes   = require("./routes/campgrounds"),
        indexRoutes         = require("./routes/index");
 
 
 
app.locals.moment=momentt;
mongoose.connect("mongodb://localhost/yelp_camp_v12");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

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
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds" ,campgroundsRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp Server Has Started!");
});