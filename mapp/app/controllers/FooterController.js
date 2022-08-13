var express = require('express');
var router = express.Router();

const Footer = require("../models/footer/Footer");
const recentPost = require("..//models/footer/Rencent_post");

const notifier = require("node-notifier");

class FooterController {

    //[GET] /info
    show(req, res, next) {
        res.render('pages/footer/info/index', { pageTitle: 'Edit Info Footer' });
    }

    //[POST] /submit
    footerLeft(req, res, next) {
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
            .catch((error) => req.send(error));
    }

    //[GET] /renent_posts
    recentPost(req, res, next) {
        res.render('pages/footer/recent_posts/index', { pageTitle: 'Edit Recent Post Footer' });
    }

    //[GET] /renent_posts/edit(/:id)?
    recentPostEdit(req, res, next) {
        if(id){
            recentPost.findOne({_id})
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
        }
    }

    //[POST] /renent_posts/edit/submit
    recentPostUpdate(req, res, next) {
        const formData = { ...req.body };
        const data = new recentPost(formData)
        data
            .save()
            .then(() => {
                notifier.notify({
                    title: "success",
                    message: "Update item success!",
                })
                res.redirect("/admin/footer")
            })
            .catch((error) => console.log(error));
    }
}
module.exports = new FooterController();
