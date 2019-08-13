const express = require('express');
const users = require('./users');
const validatePermisions = require('../middleware/validatePermissions');
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
  const { usr, role } = res.locals;
  res.render('login', { layout: 'default', usr, role });
});

router.get('/logout', (req, res) => {
  const cookie = req.cookies;
  if (cookie.token) {
    res.cookie('token', '', { expires: new Date(0) });
  }
  res.redirect('/');
});

router.get('/p1', validatePermisions(['admin', 'editor']), (req, res) => {
  const { usr, role } = res.locals;
  res.render('page1', { layout: 'default', usr, role });
});

router.get('/p2', validatePermisions(['admin', 'editor', 'reader']), (req, res) => {
  const { usr, role } = res.locals;
  res.render('page2', { layout: 'default', usr, role });
});

module.exports = [router, users];
