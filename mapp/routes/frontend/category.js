var express = require('express');
var router = express.Router();

/* GET category page. */
router.get('/', function(req, res, next) {
  res.render('pages/category/index', { pageTitle: 'Category' });
});


module.exports = router;
