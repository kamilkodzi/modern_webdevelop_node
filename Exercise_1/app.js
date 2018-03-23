var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hi there, wellcome to my assigment');
});

app.get('/speak/:animal/', function (req, res) {
    var sounds={
        pig:"Oink",
        cow:"Moo",
        dog:"Woff",
        cat:"I hate you human",
        goldfish:"....",
    }
    var animal= req.params.animal.toLowerCase();
    var dzwiek=sounds[animal];
    
  res.send('The '+animal+" say`s '"+dzwiek+"'");
});

app.get('/repeat/:word/:times', function (req, res) {
    var word=req.params.word;
    var times=Number(req.params.times);
    var tekst="";
    for(var i=0;i<times;i++){
    tekst+=word+" ";
    }
  res.send(tekst)
});

app.get('*', function (req, res) {
  res.send('Sorry page not found- what you are doing with your life?');
});


app.listen(process.env.PORT, process.env.IP);
console.log("Server is running...");