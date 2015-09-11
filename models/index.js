var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/projectOne3");
module.exports.User = require("./user.js");
// module.exports.City = require("./cities.js");