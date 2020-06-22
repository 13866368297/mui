const genID = function (length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
};
const xpageTraceId = genID(32);

export {
  xpageTraceId,
  genID
};