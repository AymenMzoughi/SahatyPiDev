const { model, Schema } = require('mongoose');
module.exports = model(
	'pharmacy',
	new Schema({
		name: {
			type: String,
			required: true,
			trim: true,
		},
		address: {
			type: String,
			required: true,
			trim: true,
		},
		logo: {
			type: String,
			required: false,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			trim: true,
		},
		meds: {
			type: [Schema.Types.ObjectId],
			ref: 'med',
		},
		status: {
			type: Number,
			required: false,
			default: 1,
		},
	})
);