const express = require('express');
const bodyParser = require('body-parser');
const authUser = require('../services/auth/auth_user');

const router = express.Router();
const jsonParser = bodyParser.json();
const cookieLifeSpan = 10; // minutes

router.post('/login', jsonParser, async (req, res) => {
  const authRequest = authUser(req.body);
  if (authRequest.success) {
    await res.cookie('token', authRequest.token, { httpOnly: true, expires: new Date(Date.now() + (60000) * cookieLifeSpan) });
    // redirect accomplished on the front end due to jQuery killing server-side redirect
    res.send(authRequest); // ensure jquery doesnt break
    // res.redirect('/'); // see https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
    return;
  }
  res.status(401);
  res.send(authRequest);
});

module.exports = router;
