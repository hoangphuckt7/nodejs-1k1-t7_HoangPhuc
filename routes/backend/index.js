const express = require("express");
const router = express.Router();

const dashboardRouter = require("./dashboard");
const buttonsRouter = require("./buttons");
const cardsRouter = require("./cards");
const colorsRouter = require("./colors");
const bordersRouter = require("./borders");
const animationsRouter = require("./animations");
const othersRouter = require("./others");
const chartsRouter = require("./charts");
const tablesRouter = require("./tables");

router.use("", dashboardRouter);
router.use("/buttons", buttonsRouter);
router.use("/cards", cardsRouter);
router.use("/colors", colorsRouter);
router.use("/borders", bordersRouter);
router.use("/animations", animationsRouter);
router.use("/others", othersRouter);
router.use("/charts", chartsRouter);
router.use("/tables", tablesRouter);

module.exports = router;
