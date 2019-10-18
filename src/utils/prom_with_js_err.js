const errors = require('../errors');

module.exports = function(fn) {
  return new Promise((resolve, reject) => {
    try {
      fn(resolve, reject);
    } catch (e) {
      reject({ status: 418, code: errors.JS_ERROR, message: e.message });
    }
  });
};
