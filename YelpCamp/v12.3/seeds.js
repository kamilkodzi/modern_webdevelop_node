var mongoose = require("mongoose");
var Campground =require("./models/campground");
var Comment =require("./models/comment");

var data = [
    {
        name:"Cloud`s Rest", 
        image:"https://images.unsplash.com/photo-1438979315413-de5df30042a1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0d10770b58515062867d5b2b7c4fc133&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod porta nisi, sed dictum tortor dictum at. Vestibulum in consectetur velit, vitae facilisis libero. Nam maximus orci leo. Integer faucibus blandit massa ac vulputate. Nullam pellentesque lectus tempus eros pulvinar, sit amet sagittis est tristique. Etiam sodales ac nibh sed bibendum. Pellentesque rutrum eu ex nec luctus. Sed pellentesque enim tincidunt tortor scelerisque, dictum varius mi convallis. Sed pretium nibh vitae enim pharetra fermentum. Phasellus pharetra lectus quis dui porta vulputate non in nisi. Vivamus commodo tempus condimentum. Curabitur sodales pulvinar tincidunt. Donec non erat lectus. Suspendisse potenti. Sed tincidunt est vel neque sagittis, vel rhoncus arcu molestie."    
    },
    {
        name:"Desser Messa", 
        image:"https://images.unsplash.com/photo-1478809956569-c7ce9654a947?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=96287b17975bd6c0a003628dd93f6ee6&auto=format&fit=crop&w=1073&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod porta nisi, sed dictum tortor dictum at. Vestibulum in consectetur velit, vitae facilisis libero. Nam maximus orci leo. Integer faucibus blandit massa ac vulputate. Nullam pellentesque lectus tempus eros pulvinar, sit amet sagittis est tristique. Etiam sodales ac nibh sed bibendum. Pellentesque rutrum eu ex nec luctus. Sed pellentesque enim tincidunt tortor scelerisque, dictum varius mi convallis. Sed pretium nibh vitae enim pharetra fermentum. Phasellus pharetra lectus quis dui porta vulputate non in nisi. Vivamus commodo tempus condimentum. Curabitur sodales pulvinar tincidunt. Donec non erat lectus. Suspendisse potenti. Sed tincidunt est vel neque sagittis, vel rhoncus arcu molestie."    
    },
    {
        name:"Sweet Home", 
        image:"https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2a1a9a1d07a8a1cb53aa3686da2ef497&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod porta nisi, sed dictum tortor dictum at. Vestibulum in consectetur velit, vitae facilisis libero. Nam maximus orci leo. Integer faucibus blandit massa ac vulputate. Nullam pellentesque lectus tempus eros pulvinar, sit amet sagittis est tristique. Etiam sodales ac nibh sed bibendum. Pellentesque rutrum eu ex nec luctus. Sed pellentesque enim tincidunt tortor scelerisque, dictum varius mi convallis. Sed pretium nibh vitae enim pharetra fermentum. Phasellus pharetra lectus quis dui porta vulputate non in nisi. Vivamus commodo tempus condimentum. Curabitur sodales pulvinar tincidunt. Donec non erat lectus. Suspendisse potenti. Sed tincidunt est vel neque sagittis, vel rhoncus arcu molestie."    
    }
];



function seedDB(){
   Campground.remove({},function(err){
    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //     console.log("remove campgrounds");
    //     //add few comments
    //     data.forEach(function(seed){
    //     Campground.create(seed,function(err,campground){
    //         if(err){
    //             console.log(err);
    //         } else{
    //             console.log("added campground");
    //             //add few comments
    //             Comment.create({
    //                 text:"This place is great, but i wish there was internet",
    //                 author:"Homer"
    //             },function(err,comment){
    //                 if(err){
    //                     console.log(err);
    //                 } else {
    //                   campground.comments.push(comment);
    //                     campground.save(); 
    //                     console.log("Created new comment");
    //                 }
                    
    //             });
    //         }
    //         });
    //     });
     });
}








module.exports = seedDB;