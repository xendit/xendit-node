module.exports = {
  basicAuthHeader(key) {
    return `Basic ${Buffer.from(`${key}:`).toString('base64')}`;
  },
};
