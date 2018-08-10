module.exports = function(app) {
	var data = require("../all.json");
	var Word = app.models.Word;
	data.forEach((entry) => {
		let word = entry['word'];
		Word.upsertWithWhere({ 'word': word }, entry, function(err, record) {});
	});
};
