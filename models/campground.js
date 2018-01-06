var mongoose = require("mongoose");
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    img: String,
    desc: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    } ],
    author: {
            id:{
             type: mongoose.Schema.Types.ObjectId,
             name: "User"
             },
        username: String
    }
},{usePushEach: true});

module.exports = mongoose.model("Campground", campgroundSchema);