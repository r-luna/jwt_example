const { jwtSign } = require('../../handlers').jwt;

// our user "table"
const user = {
  useremail: 'someone@nowhere.com',
  password: 'qwerty', // obviously this should be hashed
};

const authUser = ({ useremail, password }) => {
  const responseObj = {};
  if (useremail !== user.useremail || password !== user.password) {
    responseObj.success = false;
    responseObj.message = 'Login failed';
    return responseObj;
  }
  const payload = {
    data1: 'd1',
    data2: 'd2',
    data3: 'd3',
    data4: 'd4',
  };
  const signingOptions = {
    issuer: 'ACME Inc',
    subject: 'someone@acmeinc.com',
    audience: 'test',
    expiresIn: '12h',
    algorithm: 'RS256',
  };
  const token = jwtSign(payload, signingOptions);
  responseObj.success = true;
  responseObj.message = 'Login success';
  responseObj.token = token;
  return responseObj;
};

module.exports = authUser;
