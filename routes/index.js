const express = require('express');
const users = require('./users');

const { jwtVerify } = require('../handlers');

const router = express.Router();

router.get('/', (req, res) => {
  const jwt = req.cookies.token;
  const isValid = jwtVerify(jwt);
  res.render('index', { layout: 'default', role: isValid.aud });
});

router.get('/login', (req, res) => {
  res.render('login', { layout: 'default' });
});

router.get('/logout', (req, res) => {
  const cookie = req.cookies;
  if (cookie.token) {
    res.cookie('token', '', { expires: new Date(0) });
  }
  res.redirect('/');
});

module.exports = router;
module.exports = [router, users];
