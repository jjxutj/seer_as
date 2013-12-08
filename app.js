
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var app = express();
var fs = require('fs');

//导入所有的 models
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



var partials = require('express-partials');
app.set('view engine', 'ejs');
app.use(partials()); 


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//设置路由
app.get('/',routes.index);
app.get('/get_as_file',routes.get_as_file);
app.get('/static_files',routes.static_files);
app.get('/re_init_file_path',routes.re_init_file_path)

app.get('/task',function(req, res){
  res.render('task');
})

app.post('/search_file',routes.search_file);


mongoose.connect('mongodb://127.0.0.1:27017/test');



http.createServer(app).listen(app.get('port'), function(){
  	console.log('Express server listening on port ' + app.get('port'));
});