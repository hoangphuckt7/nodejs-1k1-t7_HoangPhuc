var express = require('express');
var router = express.Router();

class Dashboard {

    //[GET] /
    show(req, res, next) {
        res.render('pages/home/index', { pageTitle: 'Dashboard' });
    }
}

module.exports = new Dashboard();