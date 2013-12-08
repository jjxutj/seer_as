var rd = require('rd');
var mongoose = require('mongoose')



var floder0 = '/home/work/.jenkins/jobs/seer-as/workspace';

var floder = '/Volumes/mac/work/seer';

var all_mum = 0;

var files;

var index = 0;

var is_busy = false;


var child_process = require('child_process');
 
var child = child_process.fork('./control/find_new_file.js');


module.exports.start_search = function(end_callback)
{

  var file_model = mongoose.model('as_file');
  child.send('find'); // 向child线程发送消息

}




