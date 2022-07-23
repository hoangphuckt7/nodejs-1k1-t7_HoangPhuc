const express = require("express");
const router = express.Router();

const dashboardRouter = require("./dashboard");
const tablesRouter = require("./tables");
const authRouter = require("./auth");

router.use("", dashboardRouter);
router.use("/tables", tablesRouter);
router.use("/auth", authRouter);

module.exports = router;
