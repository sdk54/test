var Movie = require('../models/movie');
var Actor = require('../models/actor');

module.exports = {

  getAll: function(req, res, next) {
    Movie.find(function(err, movies) {
      if (err) return;
       Movie.find().populate('actors')
		.exec(function(err, movies){
			if (err) {next(err);};
      console.log(movies);
			 res.render('movies.ejs', {movies: movies}); 
		});
    //  res.render('movies.ejs', {movies: movies});  
    });
  },
  InsertOne: function(req, res, next) {

   console.log("req ==>"+req); 
    
  },
     getFormAdd: function(req, res, next) {
        Movie.find(function(err, movies) {
      if (err) return;

      res.render('addA.ejs', {movies: movies});  
    });
      
  },

  createOne: function(req, res, next) {
    Movie.create(req.body, function(err, movie) {
      if (err) return res.status(400).json(err);
      res.status(201).json(movie);
    });
  },


  getOne: function(req, res, next) {
    Movie.findOne({ id: req.params.id })
    .populate('actors')
    .exec(function(err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      res.status(200).json(movie);
    });
  },


  updateOne: function(req, res, next) {
    Movie.findOneAndUpdate({ id: req.params.id }, req.body, function(err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      res.status(200).json(movie);
    });
  },


  deleteOne: function(req, res, next) {
    Movie.findOneAndRemove({ id: req.params.id }, function(err) {
      if (err) return res.status(400).json(err);

      res.status(204).json();
    });
  },


  addActor: function(req, res, next) {
    Movie.findOne({ id: req.params.id }, function(err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      Actor.findOne({ id: req.body.id }, function(err, actor) {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();

        Movie.findOneAndUpdate({ id: movie.id } , {$push: {actors: actor}}, { upsert: true }, function(error, document)
         {
          if (err) return res.status(500).json(err);

          res.status(201).json(movie);
        });
      
       
      });
    });
   
  },


  deleteActor: function(req, res, next) {
    Movie.findOne({ id: req.params.id }, function(err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      // HACK TO CHANGE
      movie.actors = [];
  /*     Movie.findOneAndUpdate({ id: movie.id } , {$pull: {actors: { id: req.body.id}}}, { upsert: true }, function(error, document)
         {
          if (err) return res.status(500).json(err);

          res.status(201).json(movie);
        });*/
      movie.save(function(err) {
        if (err) return res.status(400).json(err);

        res.status(204).json(movie);
      })
    });
  }

};

