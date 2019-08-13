module.exports = {
  isEditor: (a, options) => {
    if (a === 'editor') {
      return options.fn(this);
    }
    return options.inverse(this);
  },
};
