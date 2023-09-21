exports.install = function() {

	// Sets cors for the entire API
	CORS();

	ROUTE('GET    /api/users/          *Users --> query');
	ROUTE('GET    /api/users/{id}/     *Users --> read');
	ROUTE('POST   /api/users/          *Users --> create');
	ROUTE('PUT    /api/users/{id}/     *Users --> update');
	ROUTE('DELETE /api/users/{id}/     *Users --> remove');
};
