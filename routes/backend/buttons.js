var express = require('express');
var router = express.Router();

/* GET buttons page. */
router.get('/', function(req, res, next) {
  res.render('pages/buttons/index', { pageTitle: 'Buttons' });
});

module.exports = router;
