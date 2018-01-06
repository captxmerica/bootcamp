var express= require("express");
var app=express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash= require("connect-flash");
var passport= require("passport");
var LocalStrategy= require("passport-local");
var methodOverride = require("method-override");
var User =require("./models/user");
// var seedDB = require("./seeds");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
//sucessfully added to git repo



mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});
// mongoose.connect("mongodb://potato:password@ds241737.mlab.com:41737/yelpcampx", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); 
// --- seed the DataBase

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Brain Food",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error= req.flash("error");
    res.locals.success= req.flash("success");
    next();
});

//REQUIRING ROUTES
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server started");
});



//RESTFUL ROUTES


//name        url       verb        desc.
// ==============================================
//INDEX      /dogs      GET         Display a list of all dogs
//NEW        /dogs/new  GET         Displays form to make new dog
//CREATE     /dogs      POST        Add new dog to DB
//SHOW       /dogs/:id  GET         shows info about one dog


// Campground.create(
//      {name: "Granite Hill ", 
//      img: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?dpr=2&auto=format&fit=crop&w=767&h=511&q=60&cs=tinysrgb",
//      desc: "This is a huge granite hill. "
     
//      },
// function(err, campground){
//     if(err){
//         console.log(err)
//     } else{
//         console.log(campground)
//     }
// })

// var campgrounds = [
//         {name: "Cedar Peak", img: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&w=1506&q=80" },
//         {name: "Deer Trail ", img: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=1500&q=80" },
//         {name: "Granite Hill ", img: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?dpr=2&auto=format&fit=crop&w=767&h=511&q=60&cs=tinysrgb" },
//         {name: "Cedar Peak", img: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&w=1506&q=80" },
//         {name: "Deer Trail ", img: "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=1500&q=80" },
//         {name: "Granite Hill ", img: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?dpr=2&auto=format&fit=crop&w=767&h=511&q=60&cs=tinysrgb" },
//         {name: "Grizzly Rest ", img: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?dpr=2&auto=format&fit=crop&w=767&h=511&q=60&cs=tinysrgb" },
//         {name: "Grizzly Rest ", img: "https://images.unsplash.com/photo-1487730116645-74489c95b41b?dpr=2&auto=format&fit=crop&w=767&h=511&q=60&cs=tinysrgb" }
//         ];


