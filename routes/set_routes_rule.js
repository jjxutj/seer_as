exports.set_rule = function()
{

	app.get('/', routes.index);
	app.get('/users', user.list);
}