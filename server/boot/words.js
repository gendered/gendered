module.exports = function(app) {
	var data = require("../all.json");
	var Word = app.models.Word;
	data.forEach((entry) => {
		let word = entry['word'];
		Word.findOne({ where: { 'word': word }}, function(err, record) {
			if(!record) {
				Word.upsert(entry, function(err, instance) {
					// console.log(instance);
				});
			}
	   });
	});
};
