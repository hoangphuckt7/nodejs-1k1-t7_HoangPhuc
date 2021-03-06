const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');

/* GET aut page. */
router.get('/login', function(req, res, next) {
  req.body = JSON.parse(JSON.stringify(req.body))
  let item = Object.assign(req.body)
  res.render('pages/auth/index', {layout: './../../views/admin/login.ejs', pageTitle: 'Auth', item });
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
});

passport.use(new LocalStrategy(function verify(username, password, cb) {
  console.log(username + password);
  return done(null, false)
}));

module.exports = router;
