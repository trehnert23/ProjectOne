var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

var db = require('./models');
// pre-seeded phrase data
var phrases =[
  {word: "REPL", definition: "Read, Eval, Print, Loop"},
  {word: "Reference Type", definition: "Any data type that is not a primitive type"},
  {word: "Constructor", definition: "Function used as a blueprint to create a new object with specified properties and methods"},
  {word: "Callback", definition: "Function passed as an argument to another function"},
  {word: "Query string", definition: "A list of parameters (represented as key-value pairs) appended to the end of a URL string"}
];
db.Phrase.remove({}, function (err, deleted) {
  if (err) { 
    return console.log(err);
  }
  console.log('all phrases deleted');
  // now add the phrases
  phrases.forEach(function (phrase) {
    db.Phrase.create(phrase, function (err, newPhrase) {
      if (err) {
        return console.log(err);
      }
      console.log('created new word: ', newWord);
    });
  });
});
Add Comment