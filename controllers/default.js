exports.install = function() {
	F.route('/', plain_version);
};

function plain_version() {
	var self = this;
	self.plain('REST Service {0}\nVersion: {1}'.format(F.config.name, F.config.version));
}