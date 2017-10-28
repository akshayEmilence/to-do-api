var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');

var PORT =  process.env.PORT || 3000; // envimment variable for heroku  if !defined port = 3000
var todoNextId =3;

app.use(bodyParser.json());
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
	var matchedTodo = _.findWhere(todos, {id: todoId}); 
	//var arrayNew = [];
	//arrayNew.push(value);

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
	//	res.json('Not found');
		res.status(404).send();

	}
});
//Post  / todos
app.post('/todos',function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send('qwwqqwq');
	}
	//tri,  body.description
	body.description = body.description.trim();
	// add id field
	body.id = ++todoNextId;

	// push body into array
	todos.push(body);
	
	res.json(body);

});

app.delete('/todos/:id', function (req, res) {
	var todoId =parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id:todoId});

	if(!matchedTodo) {
		res.status(404).json({"error " : "no todo item"})
	} else {
		todos = _.without(todos, matchedTodo) ;
		res.json(matchedTodo);
	}
});
//Get /todo/987/:id

app.listen(PORT , function () {  
 console.log('express listining on port ' + PORT +'!');
});