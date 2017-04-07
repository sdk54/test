// /src/models/plugins/generateId.js
module.exports = function() {
return function generateId(schema){
    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var ID_LENGTH = 8;

 schema.pre('validate',function(next, done) {
     try {
    var instance = this;
      var model = instance.model(instance.constructor.modelName);

     if (instance.id == null) {
        model.findOne().sort('-id').exec(function(err, maxInstance) {
          if (err) {
            return done(err);
          } else {
            var maxId = maxInstance.id || 0;
            instance.id = maxId + 1;
            next();
          }
        });
     }
 else
 {
     next();
 }

     } catch (error) {
        console.log(error); 
        return done(err);
     }
  })
 }
};

