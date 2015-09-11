var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    var CitySchema = new Schema([{

    	cityName:{
    		type: String,
    		required: true

    	},
    	weather:{
    		type: String,
    		required: true
    	}

    }])

var City = mongoose.model("City", CitySchema);

module.exports.model = City;
module.exports.Schema = CitySchema;

