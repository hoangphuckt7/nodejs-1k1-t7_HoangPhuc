var express = require('express');
var router = express.Router();
const footerController = require("../../app/controllers/FooterController")

router.get("/info", footerController.show)
router.post("/submit", footerController.footerLeft)
router.get("/renent_posts", footerController.recentPost)
router.get("/renent_posts/edit(/:id)?", footerController.recentPostEdit)
router.post("/renent_posts/edit/submit", footerController.recentPostUpdate)

module.exports = router;
