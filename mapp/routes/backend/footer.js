var express = require('express');
var router = express.Router();

/* GET dashboard page. */
router.get('/', function(req, res, next) {
  res.render('pages/footer/index', { pageTitle: 'Edit Footer' });
});


module.exports = router;
