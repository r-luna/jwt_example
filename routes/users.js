const express = require('express');
const bodyParser = require('body-parser');
const authUser = require('../services/auth/authUser');

const router = express.Router();
const jsonParser = bodyParser.json();
const cookieLifeSpan = process.env.JWT_exp; // minutes

router.post('/login', jsonParser, async (req, res) => {
  const authRequest = authUser(req.body);
  if (authRequest.success) {
    await res.cookie('token', authRequest.token, { httpOnly: true, expires: new Date(Date.now() + (60000) * cookieLifeSpan) });
    res.status(301);
    res.redirect('/');
    return;
  }
  res.status(401);
  res.send(authRequest);
});

module.exports = router;
