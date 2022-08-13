// var express = require('express');
// var router = express.Router();
const paramHelper = require("../../helpers/param");

const FooterModule = require("../models/footer/Footer");
const recentPostModule = require("../models/footer/Rencent_post");

const notifier = require("node-notifier");

class FooterController {

    //[GET] /info
    show(req, res, next) {
        res.render('pages/footer/info/index', { pageTitle: 'Edit Info Footer' });
    }

    //[POST] /submit
    footerLeft(req, res, next) {
        const formData = { ...req.body };
        const data = new FooterModule(formData)
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
        recentPostModule.find()
            .then((item) => {
                res.render('pages/footer/recent_posts/index', { 
                    pageTitle: 'List Recent Post Footer' ,
                    item
                });
            })
            .catch(next)
    }

    //[GET] /renent_posts/create(/:id)?
    recentPostCreate(req, res, next) {
        var id = paramHelper.getParam(req.params, "id", "");
        let itemDefault = { postName: "", postTime: "", postUrl: "" };
        if(id){
            recentPostModule.findById({_id: id})
                .then((item)=>{
                    res.render("pages/footer/recent_posts/edit/index", {
                        pageTitle : "Edit Item",
                        item
                    })

                })
        }else {
            res.render("pages/footer/recent_posts/edit/index", {
                pageTitle : "Add Item",
                item: itemDefault
            })
        }
    }

    //[POST] /renent_posts/store
    recentPostStore(req, res, next) {
        var id = paramHelper.getParam(req.params, "id", "");
        const formData = { ...req.body };
        if(id){
            recentPostModule.updateOne({_id: id}, formData)
            .then(()=>res.redirect("/admin/footer/renent_posts"))
            .catch(next)
        }else{
            const data = new recentPostModule(formData)
            data
                .save()
                .then(()=>{
                    res.redirect("/admin/footer/renent_posts")
                })
                .catch((error) => console.log(error));
        }
    }

    //[DELETE] /renent_posts/delete/:id
    recentPostDelete(req, res, next) {
        var id = paramHelper.getParam(req.params, "id", "");
        recentPostModule.deleteOne({_id: id})
            .then(()=>res.redirect("/admin/footer/renent_posts"))
            .catch(next)
    }
}
module.exports = new FooterController();
