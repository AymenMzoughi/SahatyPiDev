const { model, Schema } = require('mongoose');
module.exports = model(
	'med',
	new Schema({
		name: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: String,
			required: false,
			trim: true,
		},
		stock: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		status: {
			type: Number,
			required: false,
			default: 1,
		},
		type: {
			type: String,
			required: true,
		},
	})
);