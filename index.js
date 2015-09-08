var express = require('express'),
    bodyParser = require('body-parser'),
    db = require('./models'),
    session = require('express-session'),
    path = require('path'),
    ejs = require('ejs'),
    keygen = require('keygenerator'),
    methodOverride = require('method-override'),
    app = express();

    var listener = app.listen(3000, function () {
  console.log("Listening on port " + listener.address().port);
});