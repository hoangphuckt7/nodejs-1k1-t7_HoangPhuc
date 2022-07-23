var express = require('express');
var router = express.Router();

/* GET blog page. */
router.get('/', function(req, res, next) {
  res.render('pages/home/index', { pageTitle: 'Blog' });
});


module.exports = router;
