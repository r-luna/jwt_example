const { jwtSign } = require('../../handlers');

// our user "table"
const users = [
  {
    useremail: 'someone@nowhere.com',
    password: 'qwerty', // obviously this should be hashed
    role: 'admin',
  },
  {
    useremail: 'phantom@blackhole.com',
    password: 'foobar',
    role: 'editor',
  },
  {
    useremail: 'joedirt@mindspring.com',
    password: 'mullethead',
    role: 'reader',
  },
];

const findUser = ({ useremail: usr, password: pwd }) => {
  const foundUser = users.filter(user => user.useremail === usr && user.password === pwd);
  return foundUser.length === 0 ? null : foundUser[0];
};

const authUser = (payload) => {
  const user = findUser(payload);
  const responseObj = {};
  if (!user) {
    responseObj.success = false;
    responseObj.message = 'Login failed';
    return responseObj;
  }
  const data = {
    usr: user.useremail,
    role: user.role,
    data3: 'd3',
    data4: 'd4',
  };

  responseObj.success = true;
  responseObj.message = 'Login success';
  responseObj.token = jwtSign(data);
  return responseObj;
};

module.exports = authUser;
