var db = require('./models');

// Display db users

// preseeded cities

var city_list =[
  {cityName: "San Francisco" , weather: "65F"},
  {cityName: "Los Angeles", weather: "70F"},
  {cityName: "San Jose", weather: "72F"},
  {cityName: "San Diego", weather: "75F"}
];

// db.City.create(city_list);

// db.City.find({}, function(err, city) {
// 	console.log(city);
// 	process.exit();
// })



// db.City.remove({}, function (err, deleted) {
//   if (err) { 
//     return console.log(err);
//   }
//   console.log('all cities deleted');
  // now add the cities
  city_list.forEach(function (city) {
    db.City.create(city_list, function (err, newcity) {
      if (err) {
        return console.log(err);
      };
      console.log('created new cityName: ', newcityName);
     	process.exit();
    });
  // });

//to see all users in the db

// db.City.find({}, function(err,success){

// 	success.forEach(function(city_list){
// 		console.log(city_list);
// 		console.log('-------------');

// 	});
// 	process.exit(0);
// });