const fetch = require('node-fetch');

module.exports = function(endpointURL, opts) {
  return new Promise((resolve, reject) => {
    try {
      opts.headers = injectTrackingHeaders(opts.headers);
      fetch(endpointURL, opts)
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

const clientVersion = require('../../package.json').version;
function injectTrackingHeaders(headers) {
  // Making this function pure - not affecting the original headers object
  // This assignment also handles undefined/null values of headers arg
  const injectedHeaders = Object.assign({}, headers);
  injectedHeaders['xendit-lib'] = 'node';
  injectedHeaders['xendit-lib-ver'] = clientVersion;

  return injectedHeaders;
}
