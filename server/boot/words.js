module.exports = function(app) {
  var data = require("../all.json");
  var Word = app.models.word;
  app.dataSources.db.automigrate('word', function(err) {
    Word.create(data, function(err, instances) {
      instances.forEach(function(entry) {
        const word = entry['word'];
        const equiv = entry['equivalent'];
        if (equiv) {
          let equivalent = { "where": { "word": equiv } };
          Word.findOne(equivalent, function(err, instance) {
            console.log(instance, entry);
            entry.equivalentId = instance.id;
            instance.equivalentId = entry.id;
          }); 
        }
      });
    });
  });
};

