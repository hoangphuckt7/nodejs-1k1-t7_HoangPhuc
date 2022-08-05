var express = require('express');
var router = express.Router();

const Footer = require("../../configs/models/Footer");

/* GET Edit Info Footer page. */
router.get('/info', function (req, res, next) {
    res.render('pages/footer/info/index', { pageTitle: 'Edit Info Footer' });
});

router.post('/submit', function (req, res, next) {
    const formData = { ...req.body };
    const data = new Footer(formData)
    data
        .save()
        .then(() => {
            notifier.notify({
                title: "success",
                message: "Update item success!",
            })
            res.redirect("/admin/footer")
        })
        .catch((error) => { });
})

/* GET Edit RECENT POSTS Footer page. */
router.get('/renent_posts', function (req, res, next) {
    res.render('pages/footer/recent_posts/index', { pageTitle: 'Edit Recent Post Footer' });
});

router.get('/renent_posts/edit', function (req, res, next) {
    res.render('pages/footer/recent_posts/edit/index', { pageTitle: 'Edit Recent Post Footer' });
});

router.post('/renent_posts/edit/submit', function (req, res, next) {
    const formData = { ...req.body };
    console.log(formData);
    const data = new Footer.RencentPostsSchema(formData)
    data
        .save()
        .then(() => {
            notifier.notify({
                title: "success",
                message: "Update item success!",
            })
            res.redirect("/admin/footer")
        })
        .catch((error) => { });
})

module.exports = router;
