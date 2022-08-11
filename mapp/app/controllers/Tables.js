var express = require("express");
var router = express.Router();
const util = require("util");
const fs = require("fs");

const Items = require("../models/tables/Items");
const paramHelper = require("../../helpers/param");
const UtilsHelpers = require("../../helpers/utils");
// const ValidateTables = require("../../validates/tables");
const systemConfig = require("../../configs/system");
const notifyConfig = require("../../configs/notify");

const notifier = require("node-notifier");
const randomstring = require("randomstring");
const path = require("path")
const { body, validationResult, check } = require("express-validator");

class Tables {

    //[GET] (/status/:status)?
    show(req, res, next) {
        let objWhere = {};
        let keywork = paramHelper.getParam(req.query, "keywork", "");

        let currentStatus = paramHelper.getParam(req.params, "status", "all");
        let statusFilter = UtilsHelpers.createFillerStatus(currentStatus);

        if(currentStatus !== "all") objWhere.status = currentStatus
        if(keywork !== "") objWhere.name = new RegExp(keywork, "i")

        Items.find(objWhere)
            .then((items) => {
                res.render("pages/tables/index", {
                    pageTitle: "Tables",
                    items: items,
                    statusFilter,
                    currentStatus,
                    keywork,
                    objWhere,
                });
            })
            .catch(next);
    }

    //[GET] /change-status/:id/:status 
    changeStatus(req, res, next) {
        let currentStatus = paramHelper.getParam(req.params, "status", "active");
        let id = paramHelper.getParam(req.params, "id", "");
        let status = currentStatus === "active" ? "inactive" : "active";
        let data = {
            status: status,
            modified: {
                user_id: 0,
                user_name: 'admin',
                time: Date.now()
            }
        }
        Items.updateOne({ _id: id }, data)
            .then(() => {
            notifier.notify({
                title: notifyConfig.change_status.NOTIFY_CHANGE_STATUS_TITLE,
                message: notifyConfig.change_status.NOTIFY_CHANGE_STATUS_MESSAGE,
            });
            res.redirect(`/${systemConfig.prefixAdmin}/tables`);
            })
            .catch((err) => {
                notifier.notify({
                    title: notifyConfig.change_status.NOTIFY_CHANGE_STATUS_TITLE_FAIL,
                    message: notifyConfig.change_status.NOTIFY_CHANGE_STATUS_MESSAGE_FAIL,
                });
            });
    }

    //[POST] /change-status/:status
    changeStatusMutil(req, res, next) {
        let currentStatus = paramHelper.getParam(req.params, "status", "active");
        Items.updateMany({ _id: { $in: req.body.cid } }, { status: currentStatus })
            .then((resulf) => {
                res.redirect(`/${systemConfig.prefixAdmin}/tables`);
                notifier.notify({
                    title: notifyConfig.change_status.NOTIFY_CHANGE_STATUS_TITLE,
                    message: util.format(
                    notifyConfig.change_status.NOTIFY_CHANGE_STATUS_MULTI_MESSAGE_SUCCESS,
                    resulf.modifiedCount
                    ),
                });
            })
            .catch((err) => {
                notifier.notify({
                    title: notifyConfig.change_status.NOTIFY_CHANGE_STATUS_TITLE,
                    message: util.format(
                    notifyConfig.change_status.NOTIFY_CHANGE_STATUS_MULTI_MESSAGE_FAIL,
                    resulf.modifiedCount
                    ),
                });
            });
    }

    //[GET] /delete/:id
    async deleteStatus(req, res, next) {
        let id = paramHelper.getParam(req.params, "id", "");
        let item = await Items.findOne({ _id : id })
        console.log('object :>> ', 'uploads/img/' + item.avatar);
        fs.unlink('uploads/img/' + item.avatar, (err) => {if(err) {throw err;}});
        await Items.deleteOne({ _id: id }, (err, resulf) => {
            
            res.redirect(`/${systemConfig.prefixAdmin}/tables`);
        });
    }

    //[POST] /delete
    deleteStatusMutil(req, res, next) {
        Items.deleteMany({ _id: req.body.cid }, (err, resulf) => {
            res.redirect(`/${systesmConfig.prefixAdmin}/tables`);
          });
    }

    //[POST] /change-ordering
    changeOrdering(req, res, next) {
        const ids = req.body.cid;
        const orderings = req.body.ordering;

        if (Array.isArray(ids)) {
            ids.forEach((item, index) => {
            Items.updateOne(
                { _id: item },
                { ordering: parseInt(orderings[index]) },
                (err, resulf) => {}
            );
            });
        } else {
            Items.updateOne(
                { _id: ids },
                { ordering: parseInt(orderings) },
                (err, resulf) => {}
            );
        }
        res.redirect(`/${systemConfig.prefixAdmin}/tables`);              
    }

    //[GET] /form(/:slug)?
    showEditForm(req, res, next) {
        let slug = paramHelper.getParam(req.params, "slug", "");
        let itemDefault = { name: "", ordering: 0, status: "Choose Status" };
        let errors = null;
        if (slug) {
            Items.findOne({ slug })
            .then((item) => {
                const nameItems = item.name;
                pageTitle = "Edit " + nameItems;
                res.render("pages/tables/edit/index", {
                    pageTitle: pageTitle,
                    item,
                    errors,
                });
            })
            .catch(next);
        } else {
            pageTitle = "Add";
            res.render("pages/tables/edit/index", {
                pageTitle: pageTitle,
                item: itemDefault,
                errors,
            });
        }
    }

    //[POST] /submit
    addEditItem(req, res, next) {
        const formData = { ...req.body };
        const errors = validationResult(req);
        if (typeof formData !== "undefined" && formData.id !== "") {
            const item = formData;
            item.avatar = req.file.filename
            if (!errors.isEmpty()) {
                const nameItems = item.name;
                pageTitle = "Edit " + nameItems;
                res.render("pages/tables/edit", {
                pageTitle: pageTitle,
                item,
                errors,
                });
            } else {
                Items.updateOne({ _id: item.id }, item)
                .then(() => {
                    notifier.notify({
                    title: "success",
                    message: "Update item success!",
                    });
                    setTimeout(() => {
                    res.redirect(`/${systemConfig.prefixAdmin}/tables`);
                    }, 3000);
                })
                .catch((err) => req.send(err));
            }
        } else {
            const item = new Items(formData);
            item.avatar = req.file.filename
            if (!errors.isEmpty()) {
                pageTitle = "Add";
                res.render("pages/tables/edit", {
                pageTitle: pageTitle,
                item,
                errors,
                });
            } else {
                item.created = {
                    user_id: 0,
                    user_name: 'admin',
                    time: Date.now()
                },
                item
                .save()
                .then(() => {
                    notifier.notify({
                    title: "success",
                    message: "Update item success!",
                    });
                    setTimeout(() => {
                    res.redirect(`/${systemConfig.prefixAdmin}/tables`);
                    }, 3000);
                })
                .catch((err) => req.send(err));
            }
        }
    }
}

module.exports = new Tables()