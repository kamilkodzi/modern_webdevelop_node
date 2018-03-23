var mongoose = require("mongoose")

//POST - title, contentd
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

module.exports= mongoose.model("Post",postSchema);