NEWSCHEMA('Users', function(schema) {

	schema.define('firstname', 'Name(30)', true);
	schema.define('lastname', 'Name(30)', true);
	schema.define('email', 'Email', true);
	schema.define('phone', 'Phone');

	schema.action('query', {
		name: 'Returns list of users',
		query: 'q:String',
		action: function($) {
			var builder = DB().find('nosql/users');
			$.query.search && builder.search('search', $.query.search);
			builder.fields('id,firstname,lastname,dtcreated');
			builder.sort('dtcreated_desc');
			builder.callback($.callback);
		}
	});

	schema.action('read', {
		name: 'Reads a user profile',
		params: 'id:UID',
		action: function($) {
			var params = $.params;
			DB().one('nosql/users').error('@(User not found)').where('id', params.id).callback($.callback);
		}
	});

	schema.action('create', {
		name: 'Creates a new user profile',
		action: async function($, model) {

			model.id = UID();
			model.dtcreated = NOW;
			model.search = (model.firstname + ' ' + model.lastname).toSearch();

			// Inserts data
			await DB().insert('nosql/users', model).promise($);
			$.success(model.id);
		}
	});

	schema.action('update', {
		name: 'Updates a user profile',
		params: 'id:UID',
		action: async function($, model) {
			var params = $.params;
			model.dtupdated = NOW;
			await DB.modify('nosql/users', model).id(params.id).error('@(User not found)').promise($);
			$.success(params.id);
		}
	});

	schema.action('Remove', {
		name: 'Removes a user',
		params: 'id:UID',
		action: async function($) {
			var params = $.params;
			await DB().remove('nosql/users').id(params.id).error('@(User not found)').promise($);
			$.success(params.id);
		}
	});
});