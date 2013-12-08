var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var pro_file_schema = new Schema({

	name:{ type:String },
	path:{ type:String ,index: { unique: true }}

});
mongoose.model('pro_file',pro_file_schema);
