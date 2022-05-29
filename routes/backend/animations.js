var express = require('express');
var router = express.Router();

/* GET buttons page. */
router.get('/', function(req, res, next) {
  res.render('pages/animations/index', { pageTitle: 'Animation Utilities' });
});

module.exports = router;
