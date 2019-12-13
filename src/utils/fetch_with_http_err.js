process.binding(
  'http_parser',
).HTTPParser = require('http-parser-js').HTTPParser;
const fetch = require('node-fetch');

module.exports = function() {
  const _args = arguments;

  return new Promise((resolve, reject) => {
    try {
      fetch(..._args)
        .then(res => {
          if (res.status < 200 || res.status > 299) {
            res.text().then(txt => {
              try {
                const { error_code, message } = JSON.parse(txt);
                reject({ status: res.status, code: error_code, message });
              } catch (e) {
                reject({ status: res.status, message: txt });
              }
            });

            return;
          }

          res.json().then(resolve);
        })
        .catch(reject);
    } catch (e) {
      reject(e);
    }
  });
};
