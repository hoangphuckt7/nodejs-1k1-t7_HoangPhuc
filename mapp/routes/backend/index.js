const express = require("express");
const router = express.Router();

const dashboardRouter = require("./dashboard");
const tablesRouter = require("./tables");
const footerRouter = require("./footer");

router.use("", dashboardRouter);
router.use("/tables", tablesRouter);
router.use("/footer", footerRouter);

module.exports = router;
