const querystring = require('querystring');

module.exports = function(data) {
  const dataWithoutFieldsOfUndefinedValue = {};
  Object.keys(data).forEach(k => {
    if (data[k] !== undefined) {
      dataWithoutFieldsOfUndefinedValue[k] = data[k];
    }
  });

  return querystring.stringify(dataWithoutFieldsOfUndefinedValue);
};
