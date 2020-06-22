const browserKernel = () => {
  for (let prefix of ['webkit', 'moz', 'o', 'ms']) {
    if (typeof document[prefix + 'Hidden'] !== 'undefined') {
      return prefix;
    }
  }
};

export default browserKernel;
