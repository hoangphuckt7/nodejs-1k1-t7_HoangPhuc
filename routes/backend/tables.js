var express = require("express");
var router = express.Router();
const Items = require("../../configs/models/Items");
const paramHelper = require("../../helpers/param");
const UtilsHelpers = require("../../helpers/utils");
const systemConfig = require('../../configs/system')

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

  // res.send(currentStatus + '-' + id)

  Items.updateOne({ _id: id }, { status: status }, (err, resulf) => {
    res.redirect(`/${systemConfig.prefixAdmin}/tables`);
  });
});

// Change status - Multi
router.post("/change-status/:status", (req, res, next) => {
  let currentStatus = paramHelper.getParam(req.params, "status", "active");
  console.log(currentStatus);
});

// delete status
router.get("/delete/:id", (req, res, next) => {
  let id = paramHelper.getParam(req.params, "id", "");

  // res.send(currentStatus + '-' + id)

  Items.deleteOne({ _id: id }, (err, resulf) => {
    res.redirect(`/${systemConfig.prefixAdmin}/tables`);
  });
});

module.exports = router;
