const {
  createSchedule,
  getSchedule,
  updateSchedule,
} = require('./recurring_schedule');

const RECURRING_PATH = '/recurring';

function Recurring(options) {
  let aggOpts = options;
  if (
    Recurring._injectedOpts &&
    Object.keys(Recurring._injectedOpts).length > 0
  ) {
    aggOpts = Object.assign({}, options, Recurring._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_RECURRING = this.opts.xenditURL + RECURRING_PATH;
}

Recurring._injectedOpts = {};
Recurring._constructorWithInjectedXenditOpts = function(options) {
  Recurring._injectedOpts = options;
  return Recurring;
};
Recurring.Interval = {
  Day: 'DAY',
  Week: 'WEEK',
  Month: 'MONTH',
};
Recurring.Action = {
  Stop: 'STOP',
  Ignore: 'IGNORE',
};

Recurring.prototype.createSchedule = createSchedule;
Recurring.prototype.getSchedule = getSchedule;
Recurring.prototype.updateSchedule = updateSchedule;

module.exports = Recurring;
