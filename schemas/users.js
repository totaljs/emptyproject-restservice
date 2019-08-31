NEWSCHEMA('Users', function(schema) {

	schema.define('firstname', 'Capitalize(30)', true);
	schema.define('lastname', 'Capitalize(30)', true);
	schema.define('email', 'Email', true);
	schema.define('phone', 'Phone');

	schema.setQuery(function($) {

		// Reads the user
		var builder = NOSQL('users').find();

		if ($.query.search) {
			builder.or();
			builder.search('firstname', $.query.search);
			builder.search('lastname', $.query.search);
			builder.end();
		}

		builder.fields('id', 'firstname', 'lastname', 'datecreated');
		builder.sort('dtcreated', true);
		builder.callback($.callback);
	});

	schema.setGet(function($) {

		var users = NOSQL('users');

		// Reads the user
		users.one().make(function(builder) {
			builder.where('id', $.id);
			builder.callback($.callback, 'error-users-404');
		});

	});


	schema.setInsert(function($) {

		// Removes hidden properties of the SchemaBuilder
		var data = $.clean();
		data.id = UID();
		data.dtcreated = NOW;

		// Inserts data
		NOSQL('users').insert(data).callback($.done(data.id));
	});

	schema.setUpdate(function($) {

		// Removes hidden properties of the SchemaBuilder
		var data = $.clean();

		// Modifies data
		NOSQL('users').modify(data).backup().make(function(builder) {
			builder.where('id', $.id);
			builder.callback($.done($.id));
		});
	});

	schema.setRemove(function($) {
		// Removes the user
		NOSQL('users').remove().backup().make(function(builder) {
			builder.where('id', $.id);
			builder.callback($.done($.id));
		});
	});
});