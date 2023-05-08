const { Router } = require('express');
const { body } = require('express-validator');
const {
	add,
	disable,
	getAll,
	getOne,
	updateOne,
	updateLogo,
} = require('../controllers/pharmacyController.js');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		const extension = path.extname(file.originalname);
		const filename = file.fieldname + '-' + Date.now() + extension;
		cb(null, filename);
	},
});

const upload = multer({ storage: storage });

const router = Router();
router
	.route('/')
	.get(getAll)
	.post(
		body('name').notEmpty().isLength({
			min: 5,
		}),
		body('phone').notEmpty().isLength({
			min: 8,
			max: 8,
		}),
		body('address').notEmpty().isLength({
			min: 4,
		}),
		add
	);
router
	.route('/:id')
	.get(getOne)
	.put(updateOne)
	.patch(disable)
	// @ts-ignore
	.post(upload.single('image'), updateLogo);
module.exports = router;
