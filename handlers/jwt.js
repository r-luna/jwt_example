
const jwt = require('jsonwebtoken');

// MOVE TO ENV VARIABLE !!
// http://jwtbuilder.jamiekurtz.com/
const key = 'A54yw8We08N4Dcwl0vxWbpaVQyTCQkr1';

const jwtSign = (payload) => {
  const payloadWithClaims = {
    ...payload,
    typ: 'JWT',
    iss: 'ACME Inc', // issuer
    subj: 'validuser', // subject
    aud: 'UserGroup1', // audience
    exp: Math.floor(Date.now() / 1000) + (60 * 10), // expiresIn 10min
    alg: 'HS256', // algorithm
  };
  return jwt.sign(payloadWithClaims, key); // token
};

const jwtVerify = (token) => {
  const claims = {
    typ: 'JWT',
    iss: 'ACME Inc', // issuer
    subj: 'validuser', // subject
    aud: 'UserGroup1', // audience
    alg: 'HS256', // algorithm
  };
  try {
    return jwt.verify(token, key, claims); // decoded, null if invalid
  } catch (e) {
    return e;
  }
};

const jwtDecode = token => jwt.decode(token, { complete: true });

module.exports = { jwtSign, jwtVerify, jwtDecode };
