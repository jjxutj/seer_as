var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var file_schema = new Schema({

	name:{ type:String },
	path:{ type:String,index: { unique: true } },
	info:{ type:String }

});


console.log('init file Schema');
mongoose.model('as_file',file_schema);







