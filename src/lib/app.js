var express = require('express');
var app     = express();

require('./db')(app);
require('./parser')(app);
app.set('views',__dirname + '\\..\\views');
app.set('view engine', 'ejs') ;

var actors = require('../routes/actors');
var movies = require('../routes/movies');



// Actors routes
app.route('/actors')
.get(actors.getAll)
.post(actors.createOne);

app.route('/actors/:id')
.get(actors.getOne)
.put(actors.updateOne)
.delete(actors.deleteOne);

app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id/movies/:mid', actors.deleteMovie);


// Movies routes
app.route('/movies')
.get(movies.getAll)
.post(movies.createOne);

app.route('/movies/:id')
.get(movies.getOne)
.put(movies.updateOne)
.delete(movies.deleteOne);

app.post('/movies/:id/actors', movies.addActor);
app.delete('/movies/:id/actors/:mid', movies.deleteActor);


app.get('/',movies.getAll);
app.get('/moviesList',movies.getAll);
app.get('/actorsList',actors.getAll);
app.get('/addActor',movies.getFormAdd);
app.get('/addMovie',movies.getFormAdd);

app.post('/addActor',actors.createOne);
app.route('/addMovie').post(movies.createOne);
module.exports = app;
