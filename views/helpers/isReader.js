module.exports = {
  isReader: (a, options) => {
    if (a === 'reader') {
      return options.fn(this);
    }
    return options.inverse(this);
  },
};
