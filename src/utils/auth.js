const Auth = {
  basicAuthHeader(key) {
    return `Basic ${Buffer.from(`${key}:`).toString('base64')}`;
  },
  basicHeaderWithIdempotencyKey(secretKey, xIdempotencyKey) {
    const headers = {
      Authorization: Auth.basicAuthHeader(secretKey),
      'Content-Type': 'application/json',
    };
    if (xIdempotencyKey) {
      headers['X-IDEMPOTENCY-KEY'] = xIdempotencyKey;
    }

    return headers;
  },
};

module.exports = Auth;
