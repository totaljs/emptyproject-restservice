NEWSCHEMA('User').make(function(schema) {

	schema.define('id', 'UID');
	schema.define('firstname', 'Capitalize(30)', true);
	schema.define('lastname', 'Capitalize(30)', true);
	schema.define('email', 'Email', true);
	schema.define('phone', 'Phone');

	schema.setSave(function(error, model, options, callback) {

		var users = NOSQL('users');

		// Removes hidden properties of the SchemaBuilder
		var data = model.$clean();

		// Checks if the user exists
		if (!model.id) {
			data.id = UID();
			data.datecreated = new Date();
			users.insert(data).callback(SUCCESS(callback));
			return;
		}

		data.dateupdated = new Date();

		// We don't need to modify id
		delete data.id;

		users.modify(data).make(function(builder) {
			builder.where('id', model.id);
			builder.callback(SUCCESS(callback));
		});
	});

	schema.setGet(function(error, model, options, callback) {

		var users = NOSQL('users');

		// Reads the user
		users.one().make(function(builder) {
			builder.where('id', options.id);
			builder.callback(callback, 'error-user-404');
		});
	});

	schema.setQuery(function(error, options, callback) {

		var users = NOSQL('users');

		// Reads the user
		users.find().make(function(builder) {

			if (options.search) {
				builder.or();
				builder.search('firstname', search);
				builder.search('lastname', search);
				builder.end();
			}

			builder.fields('id', 'firstname', 'lastname', 'datecreated');
			builder.callback(callback);
		});
	});

	schema.setRemove(function(error, options, callback) {

		var users = NOSQL('users');

		// Removes the user
		users.remove().make(function(builder) {
			builder.where('id', options.id);
			builder.callback(SUCCESS(callback));
		});
	});
});