exports.noRouteFound = function (req, res, next) {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};
exports.errorHandler = function (err, req, res, next) {
	res.status(res.statusCode || 500).json({
		error: err.message,
	});
	next();
};
