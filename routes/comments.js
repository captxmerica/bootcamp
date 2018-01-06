var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment= require("../models/comment");
var middlewareObj = require("../middleware/index");

//====================================
//COMMENTS ROUTES
//====================================

//NEW COMMENT FORM
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
    if(err){
        console.log(err);
    }    else{
        res.render("comments/new", {campground: campground});
    }
    });
});

//POST NEW COMMENT
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
    if(err){
        req.flash("error", "Something went wrong :/");
        console.log(err);
         }else{ 
            //create new comment
        Comment.create(req.body.comment, function(err, comment){
            if(err){
                req.flash("error", "Something went wrong :/");
                console.log(err);
            }else{
                //add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                    //connect new comment to campground
                campground.comments.push(comment);
                campground.save();
                console.log(comment);
                    //redirect campground show page
                req.flash("success", "Your comment was posted!")    
                res.redirect("/campgrounds/" + campground._id);
            }
        });
        
    }
});
});

router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res){
Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
        res.send(err);
           } else{
//dont have to use findbyid because campground id is defined in app.js refer to campground js where its simply labeled as campground_id
res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
    }
} )
});


   
router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
 Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
     if(err){
         res.redirect("back")
     } else{ 
         res.redirect("/campgrounds/" + req.params.id)
     }
 })    
})  
  
  
router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
 Comment.findByIdAndRemove(req.params.comment_id, function(err){
     if(err){
         res.redirect("back");
     } else{ 
         req.flash("success", "Comment deleted")
         res.redirect("/campgrounds/" + req.params.id);
     }
 });    
});  
  


module.exports = router;