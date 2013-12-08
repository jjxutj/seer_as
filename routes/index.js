
/*
 * GET home page.
 */
var mongoose = require('mongoose');
var fs = require('fs');
var init_search = require('../control/init_search_file');
var static_files_config;


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};




exports.get_as_file = function(req,res)
{
	res.render('as_file',{});
}

exports.static_files = function(req,res)
{
	if(static_files_config)
	{

		res.render('serch_result',{all:static_files_config,s_name:'前端常用表集合'});
	}
	else
	{

		fs.readFile(__dirname + '/config/static_files.json',null,function(err,data){

			if(err)
			{
				console.log(err);
				return;
			}
			static_files_config = [];
    		var obj = JSON.parse(data);
    		for(var name in obj)
    		{
    			var file = {};
    			file['name'] = name;
    			file['path'] = obj[name];
    			static_files_config.push(file);
    		}

    		res.render('serch_result',{all:static_files_config,s_name:'前端常用表集合'});

		});
	}

}


//上一次重新查找文件并放到数据库中的时间
var _last_re_init_time;
//文件查询函数
exports.search_file = function(req,res)
{
	var file_name = req.body.file_name;
	var file_model = mongoose.model('as_file');
	var r = new RegExp(file_name);
	//带  / 就按照路径查询 否则按照名字查询 
	var obj = file_name.indexOf('/') > 0 ? {'path':r}: {'name':r};
	file_model.find(obj,function(err,docs){

		res.render('serch_result',{all:docs,s_name:file_name});
	
	});
	if(_last_re_init_time)
	{
		var now = new Date();
		var pase_time = now.getTime() - _last_re_init_time.getTime();
		if(pase_time > 1000*60*60*24)
		{
			init_search.start_search();
			_last_re_init_time = new Date();
		}
		console.log("pase_time：-----" + pase_time);
	}
	else
	{
		init_search.start_search();
		_last_re_init_time = new Date();
	}
	
}

exports.search_task = function(req,res)
{
	var task_name = req.body.task_name;
	var file_model = mongoose.model('as_file');
	var r = new RegExp(file_name);
	//带  / 就按照路径查询 否则按照名字查询 
	var obj = file_name.indexOf('/') > 0 ? {'path':r}: {'name':r};
	file_model.find(obj,function(err,docs){

		res.render('serch_result',{all:docs,s_name:file_name});
	
	})
}
exports.re_init_file_path = function (req,res)
{

	init_search.start_search();
	res.render('as_file',{});
	
}


exports.add_pro_file = function(req,res)
{

	var name = req.body.name;
	var path = req.body.path;
	var file_model = mongoose.model('as_file');
	var obj = {'path':path};
	file_model.find(obj,function(err,docs){

		if(!err)
		{
			var pro_file_model = mongoose.model('pro_file');
			var pro_file_entity = new pro_file_model({name:name,path:path});
			pro_file_entity.save(function(err,docs)
			{
				if(err)
				{
					//这个路径已经有了
				}
				else
				{
					//成功
				}


			});

		}
		else
		{
			//路径错误

		}
	
	})
}