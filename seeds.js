var mongoose = require("mongoose");
var Campground =require("./models/campground");
var Comment = require("./models/comment");
var data=[
    // {
    //     name: "Cloud's Rest",
    //     img: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?auto=format&fit=crop&w=1559&q=80",
    //     desc: "Eaque ipsa quae ab illo inventore veritatis et quasi. Nihil molestiae consequatur, vel illum qui dolorem eum. Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam.Ut enim ad minim veniam, quis nostrud exercitation ullamco. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat. Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam."
    // },
    //     {
    //     name: "Porcupine Summit",
    //     img: "https://images.unsplash.com/photo-1502218808493-e5fd26249efc?auto=format&fit=crop&w=1950&q=80",
    //     desc: "Eaque ipsa quae ab illo inventore veritatis et quasi. Nihil molestiae consequatur, vel illum qui dolorem eum. Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam.Ut enim ad minim veniam, quis nostrud exercitation ullamco. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat. Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam."
    // },
    //     {
    //     name: "Smuggler's Notch",
    //     img: "https://images.unsplash.com/photo-1485827673861-ae65b13d3467?auto=format&fit=crop&w=1950&q=80",
    //     desc: "Eaque ipsa quae ab illo inventore veritatis et quasi. Nihil molestiae consequatur, vel illum qui dolorem eum. Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam.Ut enim ad minim veniam, quis nostrud exercitation ullamco. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat. Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam."
    //     }
    ]

function seedDB(){
    //REMOVE ALL CAMPGROUNDS
Campground.remove({}, function(err){
    if(err){
        console.log(err)
    } else{
        console.log("removed campgrounds!")
        //ADD CAMPGROUNDS
        data.forEach(function(seed){
    Campground.create(seed, function(err, data){
        if(err){
            console.log(err)
        } else{
            console.log("added a campground")
            //CREATE A COMMENT
            Comment.create({
                text: "This place is great, but i wish there was internet",
                author: "Homer"
            }, function(err, comment){
              if(err){
                  console.log(err)
              }else{
                  data.comments.push(comment);
                  data.save();
                  console.log("created new comment")
              }
                }
            )
        }
    })
})
    }
});




;}

module.exports = seedDB;