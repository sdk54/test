var mongoose = require('mongoose');
module.exports = function(app)
{
mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost/movies', {
 mongoose: { safe: true
}
}, function(err) { if (err)
{
 return console.log('Mongoose - connection error:', err);
}
});
return mongoose;
};


