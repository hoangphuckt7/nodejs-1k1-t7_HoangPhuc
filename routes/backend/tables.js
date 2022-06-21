var express = require("express");
var router = express.Router();
const util = require("util");

const Items = require("../../configs/models/Items");
const paramHelper = require("../../helpers/param");
const UtilsHelpers = require("../../helpers/utils");
// const ValidateTables = require("../../validates/tables");
const systemConfig = require("../../configs/system");
const notifyConfig = require("../../configs/notify");

const notifier = require("node-notifier");
const { body, validationResult, check } = require("express-validator");

//  GET dashboard page.
router.get("(/status/:status)?", (req, res, next) => {
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
});

// Change status
router.get("/change-status/:id/:status", (req, res, next) => {
  let currentStatus = paramHelper.getParam(req.params, "status", "active");

  let id = paramHelper.getParam(req.params, "id", "");

  let status = currentStatus === "active" ? "inactive" : "active";
  Items.updateOne({ _id: id }, { status: status })
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
      console.log(err);
    });
});

// Change status - Multi
router.post("/change-status/:status", (req, res, next) => {
  let currentStatus = paramHelper.getParam(req.params, "status", "active");
  Items.updateMany({ _id: { $in: req.body.cid } }, { status: currentStatus })
    .then(() => {
      notifier.notify({
        title: notifyConfig.change_status.NOTIFY_CHANGE_STATUS_TITLE,
        message: util.format(
          notifyConfig.change_status.NOTIFY_CHANGE_STATUS_MULTI_MESSAGE_SUCCESS,
          resulf.modifiedCount
        ),
      });
      res.redirect(`/${systemConfig.prefixAdmin}/tables`);
    })
    .catch((err) => {
      notifier.notify({
        title: notifyConfig.change_status.NOTIFY_CHANGE_STATUS_TITLE,
        message: util.format(
          notifyConfig.change_status.NOTIFY_CHANGE_STATUS_MULTI_MESSAGE_FAIL,
          resulf.modifiedCount
        ),
      });
      console.log(err);
    });
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
  });
});

// Change ordring - Multi
router.post("/change-ordering", (req, res, next) => {
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
});

// Page Edit - Add item
router.get("/form(/:slug)?", (req, res, next) => {
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
});

// Add - Edit item
router.post(
  "/submit",
  // ValidateTables.validator(body),
  body("name", "name không phù hợp").isLength({ min: 5 }),
  body("ordering", "lớn hơn 0").isInt({ gt: 0, sl: 100 }), //gt: greater, sl: smaller
  check("status", "không được rỗng").custom((value) => {
    return value !== "novalue";
  }),
  (req, res, next) => {
    const formData = { ...req.body };
    const errors = validationResult(req);
    if (typeof formData !== "undefined" && formData.id !== "") {
      const item = formData;
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
      if (!errors.isEmpty()) {
        pageTitle = "Add";
        res.render("pages/tables/edit", {
          pageTitle: pageTitle,
          item,
          errors,
        });
      } else {
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
);

module.exports = router;
