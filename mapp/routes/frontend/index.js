const express = require("express");
const router = express.Router();

const homeRouter = require("./home");
const categoryRouter = require("./category");
const postRouter = require("./post");

router.use("", homeRouter);
router.use("/category", categoryRouter);
router.use("/post", postRouter);

module.exports = router;
