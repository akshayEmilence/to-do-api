var express = require('express');
var app = express();
var PORT =  process.env.PORT || 3000; // envimment variable for heroku  if !defined port = 3000
var todos = [{
		id:1,
		description: 'go to grocery shop',
		completed: false
		}, {
		id:2,
		description: 'go to market',
		completed: false
		}, {
		id:3,
		description: 'go to nepali house',
		completed: false
	}];
app.get('/', function(req, res) { // app.get request type api . having anomynas function
	res.send('Todo Api Root');
})

//Get request /todo
app.get('/todos', function(req, res) {
	res.json(todos);
});

//Get /todo/:id
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo;
	var arrayNew = [];

todos.forEach(function (value) {
	//arrayNew.push(value);
		if (todoId === value.id) {
			matchedTodo = value;
		}
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.json('Not found');
		res.status(404).send();

	}
});

//Get /todo/987/:id

app.listen(PORT , function () {  
 console.log('express listining on port ' + PORT +'!');
});