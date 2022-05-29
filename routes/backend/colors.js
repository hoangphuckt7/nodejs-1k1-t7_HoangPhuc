var express = require('express');
var router = express.Router();

/* GET cards page. */
router.get('/', function(req, res, next) {
  res.render('pages/colors/index', { pageTitle: 'Color Utilities' });
});

module.exports = router;