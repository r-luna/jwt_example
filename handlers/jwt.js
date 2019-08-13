
const jwt = require('jsonwebtoken');

const key = process.env.JWT_key;

const jwtSign = (payload) => {
  const payloadWithClaims = {
    ...payload,
    typ: 'JWT',
    iss: 'ACME Inc', // issuer
    subj: 'validuser', // subject
    aud: 'Some Audience', // audience
    exp: Math.floor(Date.now() / 1000) + (60 * process.env.JWT_exp),
    alg: process.env.JWT_algo, // algorithm
  };
  return jwt.sign(payloadWithClaims, key); // token
};

const jwtVerify = (token) => {
  const claims = {
    typ: 'JWT',
    iss: 'ACME Inc', // issuer
    subj: 'validuser', // subject
    aud: 'Some Audience', // audience
    alg: process.env.JWT_algo, // algorithm
  };
  try {
    return jwt.verify(token, key, claims); // decoded, null if invalid
  } catch (e) {
    return e;
  }
};

const jwtDecode = token => jwt.decode(token, { complete: true });

module.exports = { jwtSign, jwtVerify, jwtDecode };
