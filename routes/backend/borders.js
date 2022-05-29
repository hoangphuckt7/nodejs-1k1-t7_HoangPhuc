var express = require('express');
var router = express.Router();

/* GET buttons page. */
router.get('/', function(req, res, next) {
  res.render('pages/borders/index', { pageTitle: 'Border Utilities' });
});

module.exports = router;
