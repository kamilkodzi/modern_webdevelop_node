var express                 =require("express"),
    passport                =require("passport"),
    bodyParser              =require("body-parser"),
    LocalStrategy           =require("passport-local"),
    passportLocalMongoose   =require("passport-local-mongoose"),
    mongoose                =require("mongoose"),
    User                    =require("./models/user.js");

mongoose.connect("mongodb://localhost/auth_demo_app");

var app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "Rusty ise the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//======================
// ROUTES
//======================

app.get("/",function(req,res){
    res.render("home");
});

app.get("/secret", isLoggedIn,function(req,res){
    res.render("secret");
});

// Auth Routes

//show sing up form
app.get("/regrister",function(req,res){
    res.render("regrister");
});
//handling up user regrister
app.post("/regrister",function(req,res){
    req.body.username;
    req.body.password;
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("regrister");
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secret");
            });
        }
    });
    
});


//LOGIN ROUTES
//render login form
app.get("/login",function(req,res){
   res.render("login");
});
//login logic
app.post("/login",passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}), function(req,res){
    
});


app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


// LISTENING THE PORT --- E N D
app.listen(process.env.PORT, process.env.IP,function(){
    console.log("Serwer wystarrtowal");
});