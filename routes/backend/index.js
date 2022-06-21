const express = require("express");
const router = express.Router();

const dashboardRouter = require("./dashboard");
const tablesRouter = require("./tables");

router.use("", dashboardRouter);
router.use("/tables", tablesRouter);

module.exports = router;
