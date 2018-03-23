var mongoose= require("mongoose");

mongoose.connect("mongodb://localhost/cat_apps");


var catSchema= new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});  

var Cat=mongoose.model("Cat",catSchema);




// adding a new cat to the DB
// var george = new Cat({
//     name: "Mrs. Norris",
//     age:7,
//     temperament:"Evil"
// });

//  george.save(function(err,cat){
//         if(err){
//             console.log("Something went worng!");
//         }else{
//             console.log("We Just saved A Cat to the DB!");
//             console.log(cat);
//         };
//  });

//retrieve all cats from the DB and console.log each one

Cat.create({
    name:"Snow White",
    age:15,
    temperament:"Bland"
    },function(err,cat){
        // console.log(cat)
    }
);


// Cat.find({},function(err,cats){
//     if(err){
//         console.log("Oh no, ERROR!");
//         console.log(err);
//     }else{
//         console.log("Al the cats.... POCZATEK");
//         console.log(cats);
//         console.log("Al the cats.... KONIEC")
//     };
    
// });