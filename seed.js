var db = require('./models');

// Display db users

db.User.find({}, function(err,success){

	success.forEach(function(user){
		console.log(user);
		console.log('-------------');

	});
	process.exit(0);
});