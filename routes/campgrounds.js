var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middlewareObj = require("../middleware/index");


//INDEX-- SHOW ALL CAMPGROUNDS
router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    //GET ALL CAMPGROUNDS FROM DB
    Campground.find({name: regex}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            if(allCampgrounds.length < 1){
                noMatch = "No results found, please try again";
            }
          res.render("campgrounds/index", {campgrounds: allCampgrounds, noMatch: noMatch, currentUser: req.user});
        }
    });
} else{ 
     Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
          res.render("campgrounds/index", {campgrounds: allCampgrounds, noMatch: noMatch, currentUser: req.user});
}});
}
});

//NEW --SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//CREATE-ADDS TO DB
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    //GET DATA FROM FORM AND ADD TO CAMPGROUNDS ARRAY
    var name = req.body.name;
    var price = req.body.price;
    var img = req.body.img;
    var desc = req.body.desc;
    var author= {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price:price, img: img, desc: desc, author: author};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
     // REDIRECTBACK TO CAMPGROUNDS PAGE
    res.redirect("/campgrounds");
        }
    });
});

//SHOW 
router.get("/:id", function(req, res){
    //FIND THE CAMPGROUND WITH PROVIDED ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            // console.log(foundCampground)
         res.render("campgrounds/show", {campground: foundCampground});    
        }
        
    });
    //RENDER SHOW TEMPLATE WITH THAT CAMPGROUND
});


//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middlewareObj.checkOwnership, function(req, res){
    //is user logged in/if not redirect
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
        res.render("campgrounds/edit", {campground: foundCampground}); 
        }
});  
});
//UPDATE CAMPGROUND ROUTE
router.put("/:id", middlewareObj.checkOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
            if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }    
    });
});

//DELETE CAMPGROUND
router.delete("/:id", middlewareObj.checkOwnership, function(req, res){
    //DESTROY BLOG
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            req.flash("success", "Campground successfully removed");
             res.redirect("/campgrounds");
        }
    });
    //REDIRECT SOMEWHERE

});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;

        //Cant do this because mongoose ID is a string and user._id is a number
        // if(foundCampground.author.id === req.user._id)