const { createPayment, getPayment, editPayment } = require('./manage_payments');
const {
  stopPayment,
  pausePayment,
  resumePayment,
} = require('./operate_payments');

const RECURRING_PATH = '/recurring';

class RecurringPayment {
  constructor(options) {
    let aggOpts = Object.assign({}, options);
    if (Object.keys(RecurringPayment._injectedOpts || {}).length) {
      aggOpts = Object.assign({}, options, RecurringPayment._injectedOpts);
    }

    this.opts = aggOpts;
    this.API_ENDPOINT = this.opts.xenditURL + `${RECURRING_PATH}_payments`;
  }

  static _constructorWithInjectedXenditOpts(options) {
    RecurringPayment._injectedOpts = options;
    return RecurringPayment;
  }
}

Object.assign(RecurringPayment, {
  _injectedOpts: {},
  Interval: {
    Day: 'DAY',
    Week: 'WEEK',
    Month: 'MONTH',
  },
  Action: {
    Stop: 'STOP',
    Ignore: 'IGNORE',
  },
});

Object.assign(RecurringPayment.prototype, {
  createPayment,
  getPayment,
  editPayment,
  stopPayment,
  pausePayment,
  resumePayment,
});

module.exports = RecurringPayment;
