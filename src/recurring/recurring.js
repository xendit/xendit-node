const { createPayment, getPayment, editPayment } = require('./manage_payments');
const {
  stopPayment,
  pausePayment,
  resumePayment,
} = require('./operate_payments');

const RECURRING_PATH = '/recurring_payments';

function RecurringPayment(options) {
  let aggOpts = options;
  if (
    RecurringPayment._injectedOpts &&
    Object.keys(RecurringPayment._injectedOpts).length > 0
  ) {
    aggOpts = Object.assign({}, options, RecurringPayment._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + RECURRING_PATH;
}

RecurringPayment._injectedOpts = {};
RecurringPayment._constructorWithInjectedXenditOpts = function(options) {
  RecurringPayment._injectedOpts = options;
  return RecurringPayment;
};
RecurringPayment.Interval = {
  Day: 'DAY',
  Week: 'WEEK',
  Month: 'MONTH',
};
RecurringPayment.Action = {
  Stop: 'STOP',
  Ignore: 'IGNORE',
};

RecurringPayment.prototype.createPayment = createPayment;
RecurringPayment.prototype.getPayment = getPayment;
RecurringPayment.prototype.editPayment = editPayment;
RecurringPayment.prototype.stopPayment = stopPayment;
RecurringPayment.prototype.pausePayment = pausePayment;
RecurringPayment.prototype.resumePayment = resumePayment;

module.exports = RecurringPayment;
