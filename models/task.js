
/**
 * 任务剧情定义
 *
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var clip_element = new Schema({
	
	name          :  { type:String,index: { unique: true } },
	step          :  {type:String},
	type          :  {type:Number},
	data          :  [],
	scripts       :  [{fun:String,args:[]}],
	start_trigger :  {type:String},
	end_trigger   :  {type:String}

});

var task_clip = new Schema({

	task_id : { type:Number },
	step    : { type:Number },
	name    : { type:String,index: { unique: true } },
	elements: [ clip_element],

});

var task =new Schema({

	task_id : { type:Number },
	name    : { type:Number },
	priority: { type:Number },
	clipes  : [task_clip]
	
	
});

mongoose.model('clip_element',clip_element);
mongoose.model('task_clip',clip_element);
mongoose.model('task',clip_element);

