module.exports = {
  isAdmin: (a, options) => {
    if (a === 'admin') {
      return options.fn(this);
    }
    return options.inverse(this);
  },
};
