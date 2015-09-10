var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require("cookie-parser"),
    db = require('./models'),
    session = require('express-session'),
    path = require('path'),
    ejs = require('ejs'),
    keygen = require('keygenerator'),
    methodOverride = require('method-override'),
    app = express();

var views = path.join(process.cwd(), "/views");
            // or we can write 
            //path.join("projectOne/", "/public");

//APPs
app.use(bodyParser.urlencoded({extended: true})); // parse POSTed data
app.use(cookieParser("Super Secret")); // parse cookie data

    //create The Session
app.use(session({
    //use keygen to generate a secret key
    secret: keygen._({specials: true}),
    resave: false,
    saveUninitialized: true

})
);
    //extending the request object to help manange sessions
app.use(function (req,res,next){
    //login a user
    req.login = function (user) {
        req.session.userId = user._id;
    };
    //find the current user
    req.currentUser = function (cb){
        db.User.findOne({_id: req.session.userId},
                function (err, user) {
                    req.user = user;
                    cb(null, user);
                }
            )
    };
    //logout the current user
    req.logout = function () {  
        req.session.userId = null;
        req.user = null;
     }
     next();
});
    
var climate = {
coord: {
lon: -122.42,
lat: 37.77
},
weather: [
{
id: 802,
main: "Clouds",
description: "scattered clouds",
icon: "03n"
}
],
base: "cmc stations",
main: {
temp: 307.94,
pressure: 1005,
humidity: 79,
temp_min: 302.04,
temp_max: 315.15
},
wind: {
speed: 3.6,
deg: 20
},
clouds: {
all: 40
},
dt: 1441846612,
sys: {
type: 1,
id: 4250,
message: 0.0153,
country: "US",
sunrise: 1441892835,
sunset: 1441938325
},
id: 5391959,
name: "San Francisco",
cod: 200
}

//VIEWS


app.get("/home",function (req,res){

res.sendFile(path.join(views, "index.html"));

});

app.get("/signup",function (req,res){

res.sendFile(path.join(views, "signup.html"));

});

app.get("/login",function (req,res){

res.sendFile(path.join(views, "login.html"));

});

// within the profile page
// FIND USER IN DB AND SHOW SCOREBAORDS
// VIA RES.SEND(SCOREBOARDDATA);
app.get("/profile",function (req,res){
// shows a specifi user
// allow user to add a new scoreboard
// allow user to view all of their saved scoreboards
// allow user ot remove a scoreboard
// allow user to update data in scorebaord
res.sendFile(path.join(views, "profile.html"));

});

// APP.POST FOR EACH Page

//SignUp
app.post("/signup", function createUser(req, res){
  var username = req.body.username;
  var password = req.body.password;

  db.User.createSecure(username, password, function(err, user){
    if ( user ) {
        req.login(user);
      // res.cookie("guid", user._id, { signed: true });
      res.redirect("/api/profile")
    } else {
      res.redirect("/login");
    }
  })

});


//Login
app.post("/login", function newSession(req,res){
    var username = req.body.username;
    var password = req.body.password;

    db.User.authenticate(username, password, function (err, user){
        if  (user){
            req.login(user);
            // res.cookie("guid", user._id, { signed: true });
            res.redirect("/profile")
        }else{
            console.log(err);
            res.redirect("/login");
        }

    })

});

//Logout
app.get("/logout", function endSession (req,res){
    console.log("loggingout here")
    res.clearCookie("guid");
    res.redirect("/home");
});

//Get Profile

app.get("/api/profile", function showProfile (req, res){
    // var guid = req.signedCookies.guid;
    db.User.find({_id: guid}, function (err, user){
        res.send({
            request_headers: req.headers,
            user: user || "NOT FOUND"
        });
    })
});


// });
    var listener = app.listen(3000, function () {
  console.log("Listening on port " + listener.address().port);
});