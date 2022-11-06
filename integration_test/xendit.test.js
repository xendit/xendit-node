// For actual usage, this should be require('xendit-node')
const Xendit = require('../src/xendit');
const dotenv = require('dotenv');

dotenv.config();

const x = new Xendit({
  secretKey:
    'xnd_development_QqTql0pzRa2WLK4gvzkVU9uS8MgF7FensRt7eR2atubk2r5ZIky2uuUkc0jkLH3',
  xenditURL: 'https://api.xendit.co',
});

module.exports = x;
