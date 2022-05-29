var express = require('express');
var router = express.Router();

/* GET dashboard page. */
router.get('/', function(req, res, next) {
  res.render('pages/home/index', { pageTitle: 'Dashboard' });
});


module.exports = router;
