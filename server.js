var express = require('express');
var app = express();
var PORT =  process.env.PORT || 3000; // envimment variable for heroku  if !defined port = 3000

app.get('/', function(req, res) { // app.get request type api . having anomynas function
	res.send('Todo Api Root');
})

app.listen(PORT , function () {  
 console.log('express listining on port ' + PORT +'!');
});