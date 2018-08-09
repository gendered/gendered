module.exports = function(app) {
  var data = require("../all.json");
  var Word = app.models.Word;
  app.dataSources.db.automigrate('Word', function(err) {
    Word.create(data, function(err, instances) {
    });
  });
};

