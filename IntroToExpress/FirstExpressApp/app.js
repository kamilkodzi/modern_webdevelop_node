var express=require("express");
var app= express();


//"/" => "Hi there!"
app.get("/", function(req,res){
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye",function(req,res){
    res.send("Good bye!");
});


// "/dog" => "MEOW"
app.get("/dog",function(req,res){
    res.send("MEOW!!!");
});



app.get("/r/:subredditName",function(req,res){
    var subreddit = req.params.subredditName;
   res.send("Wellcome to the "+subreddit.toUpperCase()+" Subreddit") ;
});

app.get("/r/:subredditName/comments/:id/:title/",function(req,res){
    res.send("You are inside comments page")
});

app.get("*",function(req,res){
   res.send("You are a star"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has starred!!!");
});