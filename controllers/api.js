exports.install = function() {

	// Sets cors for this all API
	CORS('/api/*', ['get', 'post', 'put', 'delete'], true);

	// Routes
	ROUTE('/api/users/',      json_query,   ['*User']);
	ROUTE('/api/users/{id}/', json_read,    ['*User']);
	ROUTE('/api/users/',      json_save,    ['*User', 'post']);
	ROUTE('/api/users/{id}/', json_save,    ['*User', 'put']);
	ROUTE('/api/users/{id}/', json_delete,  ['*User', 'delete']);

};

function json_query() {
	var self = this;
	var options = {};

	options.search = self.query.search;

	self.$query(options, self.callback());
}

function json_read(id) {
	var self = this;
	var options = {};

	options.id = id;

	self.$get(options, self.callback());
}

function json_save(id) {
	var self = this;

	if (id)
		self.body.id = id;

	self.$save(self.callback());
}

function json_delete(id) {
	var self = this;
	var options = {};

	options.id = id;

	self.$remove(options, self.callback());
}