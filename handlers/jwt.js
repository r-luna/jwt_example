
const jwt = require('jsonwebtoken');
const { private_key: privkey, public_key: pubkey } = require('./keys');

// PAYLOAD
/*
const payload = {
  data1: 'd1',
  data2: 'd2',
  data3: 'd3',
  data4: 'd4',
};

const issuer = 'ACME Inc';
const subject = 'someone@acmeinc.com';
const audience = 'http://www.acmeinc.com';
const expiresIn = '12h';
const algorithm = 'RS256';
*/

const jwtSign = (payload, { issuer, subject, audience, expiresIn }) => {
  const signingOptions = {
    issuer,
    subject,
    audience,
    expiresIn,
    algorithm: 'RS256',
  };
  return jwt.sign(payload, privkey, signingOptions); // token
};

const jwtVerify = (token, { issuer, subject, audience, expiresIn }) => {
  const verifyOptions = {
    issuer,
    subject,
    audience,
    expiresIn,
    algorithm: ['RS256'],
  };
  try {
    return jwt.verify(token, pubkey, verifyOptions); // decoded, null if invalid
  } catch (e) {
    return e;
  }
};

const jwtDecode = token => jwt.decode(token, { complete: true });

module.exports = { jwtSign, jwtVerify, jwtDecode };
