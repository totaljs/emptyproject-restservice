NEWSCHEMA('User').make(function(schema) {

	schema.define('id', 'UID');
	schema.define('firstname', 'Capitalize(30)', true);
	schema.define('lastname', 'Capitalize(30)', true);
	schema.define('email', 'Email', true);
	schema.define('phone', 'Phone');

	schema.setSave(function($) {

		var users = NOSQL('users');

		// Removes hidden properties of the SchemaBuilder
		var data = $.model.$clean();

		// Checks if the user exists
		if ($.model.id) {

			data.dateupdated = F.datetime;

			// We don't need to modify id
			data.id = undefined;

			users.modify(data).backup().make(function(builder) {
				builder.where('id', $.model.id);
				builder.callback(SUCCESS($.callback));
			});

		} else {

			data.id = UID();
			data.datecreated = F.datetime;
			users.insert(data).callback(SUCCESS($.callback));

		}

	});

	schema.setGet(function($) {

		var users = NOSQL('users');

		// Reads the user
		users.one().make(function(builder) {
			builder.where('id', $.options.id);
			builder.callback($.callback, 'error-users-404');
		});

	});

	schema.setQuery(function($) {

		var users = NOSQL('users');
		var options = $.options;

		// Reads the user
		users.find().make(function(builder) {

			if (options.search) {
				builder.or();
				builder.search('firstname', options.search);
				builder.search('lastname', options.search);
				builder.end();
			}

			builder.fields('id', 'firstname', 'lastname', 'datecreated');
			builder.callback($.callback);
		});

	});

	schema.setRemove(function($) {

		var users = NOSQL('users');

		// Removes the user
		users.remove().backup().make(function(builder) {
			builder.where('id', $.options.id);
			builder.callback(SUCCESS($.callback));
		});

	});
});