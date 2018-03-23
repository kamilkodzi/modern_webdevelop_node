var express=require("express");
var app= express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
});

app.get("/fallinlove/:thing",function(req,res){
    var things=req.params.thing;
    res.render("love",{thingVar: things});
});

app.get("/posts", function(req,res){
    var posts=[
        {title:"Moje mądre słowa", author:"Susy"},
        {title:"My adorable pet bunny", author:"Charlie"},
        {title:"Can you believe it`s pomsky?", author:"Colt"},
        ];
    res.render("posts",{posts:posts});
});

app.get("*", function(req,res){
    res.send("404 BŁONT");
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is listening");
});