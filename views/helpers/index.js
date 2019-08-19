
const { ifeq } = require('./ifeq');
const { isAdmin } = require('./isAdmin');
const { isEditor } = require('./isEditor');
const { isReader } = require('./isReader');
const { isLoggedIn } = require('./isLoggedIn');

module.exports = {
  ifeq,
  isAdmin,
  isEditor,
  isReader,
  isLoggedIn,
};
