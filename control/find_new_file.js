var rd = require('rd');


var floder = '/home/work/jenkins/jobs/seer-as/workspace';

var floder0 = '/Volumes/mac/work/seer';

var all_mum = 0;

var files;

var index = 0;

var is_busy = false;

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test');

require('../models/seer_as_file.js');
var file_model = mongoose.model("as_file");
process.on('message', function(m) { 
    // 处理parent线程发送过来的消息
 
    console.log('message_cmd:'+ m);


    if(is_busy)
    {
        return false;
    }
    is_busy = true;
    index = 0;
    //获取目录下所有文件


    rd.read(floder, function (err,_files) {
       
        if(err)
        {
          console.log(err);
          return;
        }
        // 完成
        files = _files;
        console.log('start______');
        for (var i = 0; i <_files.length; i++) 
        {

          console.log('i    ' + i);
          var f = files[i];
          var name = f.substring(f.lastIndexOf("/")+1,f.length);
          var type = f.substring(f.lastIndexOf('.')+1,f.length);
          console.log('type    ' + type);
          console.log('name    ' + name);

          if(f.indexOf('svn') != -1 )
          {
          }
          else if(type == 'swf' || type == 'fla' || type == 'xml')
          {
         
            var path = f.substring(floder.length,f.length);
            all_mum++;
            console.log('allnum    ' + all_mum);

            var file_entity = new file_model({'name': name,'path': path,'info': ''});

            file_entity.save(function(err,_file_entity){
              if(err)
              {
                console.log('这个已经有了' + err);
              }
              else
              {
                console.log('成功多找到一个' + _file_entity['name']);
              }
              
             

            });
           
          }

        }
        is_busy = false;

    });

});