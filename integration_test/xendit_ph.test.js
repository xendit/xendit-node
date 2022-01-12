// For actual usage, this should be require('xendit-node')
const Xendit = require('../src/xendit');
const dotenv = require('dotenv');

dotenv.config();

const xph = new Xendit({
  secretKey: process.env.SECRET_KEY_PH,
  xenditURL: process.env.XENDIT_URL,
});

module.exports = xph;
