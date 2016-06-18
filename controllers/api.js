exports.install = function() {

	// Sets cors for this API
	F.cors('/api/*', ['get', 'post', 'put', 'delete'], true);

	// Creates routes
	F.restful('/api/users/', ['*User'], json_query, json_read, json_save, json_delete);

	// Is same as:
	// F.route('/api/users/',      json_query,   ['*User']);
	// F.route('/api/users/{id}/', json_read,    ['*User']);
	// F.route('/api/users/',      json_save,    ['post', '*User']);
	// F.route('/api/users/{id}/', json_save,    ['put', '*User']);
	// F.route('/api/users/{id}/', json_delete,  ['delete', '*User']);
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

function json_create() {
	var self = this;
	self.$save(self.callback());
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