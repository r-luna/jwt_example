const express = require('express');
const bodyParser = require('body-parser');
const authUser = require('../services/auth/auth_user');

const router = express.Router();
const jsonParser = bodyParser.json();

/* GET users listing. */
router.post('/register', jsonParser, (req, res) => {
  console.log(req.body);
  const authRequest = authUser(req.body);
  console.log('@@@@@@@', authRequest);
  if (authRequest.success) {
    res.status(200);
  } else {
    res.status(401);
  }
  res.send(authRequest);
});

module.exports = router;
