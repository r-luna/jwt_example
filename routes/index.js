const express = require('express');
const users = require('./users');

const { jwtVerify } = require('../handlers');

const router = express.Router();

router.get('/', (req, res) => {
  const jwt = req.cookies.token;
  const isValid = jwtVerify(jwt);
  const userData = {};
  if (isValid) {
    userData.role = isValid.role;
    userData.usr = isValid.usr;
  }
  res.render('index', { layout: 'default', ...userData });
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

router.get('/p1', (req, res) => {
  res.render('page1', { layout: 'default' });
});

router.get('/p2', (req, res) => {
  res.render('page2', { layout: 'default' });
});

module.exports = router;
module.exports = [router, users];
