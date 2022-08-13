var express = require('express');
var router = express.Router();
const footerController = require("../../app/controllers/FooterController")

router.get("/info", footerController.show)
router.post("/submit", footerController.footerLeft)
router.get("/renent_posts", footerController.recentPost)
router.get("/renent_posts/create(/:id)?", footerController.recentPostCreate)
router.post("/renent_posts/store(/:id)?", footerController.recentPostStore)
router.get("/renent_posts/delete/:id", footerController.recentPostDelete)

module.exports = router;
