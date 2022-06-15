var express = require("express");
var router = express.Router();
const Items = require("../../configs/models/Items");
const paramHelper = require("../../helpers/param");
const UtilsHelpers = require("../../helpers/utils");
// const ValidateTables = require("../../validates/tables");
const systemConfig = require('../../configs/system')
const notifier = require('node-notifier');
const { body, validationResult } = require("express-validator");
//  GET dashboard page.
router.get("(/status/:status)?", (req, res, next) => {
	let objWhere = {};
	let keywork = paramHelper.getParam(req.query, "keywork", "");

	let currentStatus = paramHelper.getParam(req.params, "status", "all");
	let statusFilter = UtilsHelpers.createFillerStatus(currentStatus);

	if (currentStatus === "all") {
		if (keywork !== "") objWhere = { name: new RegExp(keywork, "i") };
	} else {
		objWhere = { status: currentStatus, name: new RegExp(keywork, "i") };
	}

	Items.find(objWhere)
		.then((items) => {
			res.render("pages/tables/index", {
				pageTitle: "Tables",
				items: items,
				statusFilter,
				currentStatus,
				keywork,
			});
		})
		.catch(next);
});

// Change status
router.get("/change-status/:id/:status", (req, res, next) => {
	let currentStatus = paramHelper.getParam(req.params, "status", "active");

	let id = paramHelper.getParam(req.params, "id", "");

	let status = currentStatus === "active" ? "inactive" : "active";
	Items.updateOne({ _id: id }, { status: status }, (err, resulf) => {
		notifier.notify({
			title: 'success',
			message: 'change satus success!',
		});
		res.redirect(`/${systemConfig.prefixAdmin}/tables`);
	});
});

// Change status - Multi
router.post("/change-status/:status", (req, res, next) => {
	let currentStatus = paramHelper.getParam(req.params, "status", "active");
	Items.updateMany({ _id: { $in: req.body.cid } }, { status: currentStatus }, (err, resulf) => {
		notifier.notify({
			title: 'success',
			message: `change ${resulf.modifiedCount} satus success!`,
		});
		res.redirect(`/${systemConfig.prefixAdmin}/tables`);
	})
});

// delete status
router.get("/delete/:id", (req, res, next) => {
	let id = paramHelper.getParam(req.params, "id", "");
	Items.deleteOne({ _id: id }, (err, resulf) => {
		res.redirect(`/${systemConfig.prefixAdmin}/tables`);
	});
});

// delete status - Multi
router.post("/delete", (req, res, next) => {
	console.log(req.body.cid);
	Items.deleteMany({ _id: req.body.cid }, (err, resulf) => {
		res.redirect(`/${systemConfig.prefixAdmin}/tables`);
	})
});

// Change ordring - Multi
router.post("/change-ordering", (req, res, next) => {
	const ids = req.body.cid
	const orderings = req.body.ordering

	if (Array.isArray(ids)) {
		ids.forEach((item, index) => {
			Items.updateOne({ _id: item }, { ordering: parseInt(orderings[index]) }, (err, resulf) => { });
		})
	} else {
		Items.updateOne({ _id: ids }, { ordering: parseInt(orderings) }, (err, resulf) => { });
	}
	res.redirect(`/${systemConfig.prefixAdmin}/tables`);
});

// Page Edit - Add item
router.get(("/form(/:id)?"), (req, res, next) => {

	let id = paramHelper.getParam(req.params, "id", "");
	let itemDefault = { name: '', ordering: 0, status: 'Choose Status' }
	let errors = null
	if (id !== '') {
		Items.findById(id)
			.then(item => {
				const nameItems = item.name
				pageTitle = 'Edit ' + nameItems
				res.render("pages/tables/edit/index", {
					pageTitle: pageTitle,
					item,
					errors
				})
			})
			.catch(next)
	} else {
		pageTitle = 'Add'
		res.render("pages/tables/edit/index", {
			pageTitle: pageTitle,
			item: itemDefault,
			errors
		})
	}


})

// Add item
router.post("/submit", 
	ValidateTables.validator(body),
	// body('name','name không phù hợp').isLength({min:5}),
    // body('ordering','lơn hơn 0').isInt({gt:0, sl:100}),//gt: greater, sl: smaller
    // body('status','không được rỗng').custom((value) =>{
    //     return value !== 'novalue'
	// }),
	(req, res, next) => {
		const formData = {...req.body}
		const item = new Items(formData);
		console.log(item);
		const errors = validationResult(req).errors;
		console.log(errors);
		if(typeof(item) !== 'undefined' && item.id !== ''){
			if(errors){
				const nameItems = item.name
				pageTitle = 'Edit ' + nameItems
				res.render("pages/tables/edit", {
					pageTitle: pageTitle,
					item,
					errors
				});
			}else{
				console.log('2');
			}
		}else{
			if(errors){
				pageTitle = 'Add'
				res.render("pages/tables/edit", {
					pageTitle: pageTitle,
					item,
					errors
				});
			}else{
				item
					.save()
					.then(()=>{
						notifier.notify({
							title: 'success',
							message: 'Update item success!',
						});
						setTimeout(() => {
							res.redirect(`/${systemConfig.prefixAdmin}/tables`);
						}, 3000);
					})
					.catch(err => req.send(err))
			}
		}
		
});

// Edit item
// router.post("/submit", (req, res, next) => {
// 		const formData = {...req.body}
// 		const item = new Items(formData);
// 		item
// 			.save()
// 			.then(()=>{
// 				notifier.notify({
// 					title: 'success',
// 					message: 'Update item success!',
// 				});
// 				setTimeout(() => {
// 					res.redirect(`/${systemConfig.prefixAdmin}/tables`);
// 				}, 3000);
// 			})
// 			.catch(err => req.send(err))
// });

module.exports = router;
