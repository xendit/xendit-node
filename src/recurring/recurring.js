const {
  createPlan,
  editPlan,
  getPlan,
  deactivatePlan,
} = require('./manage_plans');
const {
  createSchedule,
  getSchedule,
  editSchedule,
} = require('./manage_schedules');
const {
  getCycle,
  getAllCycles,
  cancelCycle,
  editCycle,
} = require('./manage_cycles');

const RECURRING_PATH = '/recurring';

class Recurring {
  constructor(options) {
    let aggOpts = Object.assign({}, options);
    if (Object.keys(Recurring._injectedOpts || {}).length) {
      aggOpts = Object.assign({}, options, Recurring._injectedOpts);
    }

    this.opts = aggOpts;
    this.API_ENDPOINT_PLANS = this.opts.xenditURL + `${RECURRING_PATH}/plans`;
    this.API_ENDPOINT_SCHEDULES =
      this.opts.xenditURL + `${RECURRING_PATH}/schedules`;
  }

  static _constructorWithInjectedXenditOpts(options) {
    Recurring._injectedOpts = options;
    return Recurring;
  }
}

Object.assign(Recurring, {
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
  recurringAction: {
    payment: 'PAYMENT',
    disbursment: 'DISBURSEMENT',
  },
  immediateActionType: {
    fullAmount: 'FULL_AMOUNT',
  },
  notificationChannel: {
    whatsapp: 'WHATSAPP',
    sms: 'SMS',
    email: 'EMAIL',
  },
  locale: {
    en: 'en',
    id: 'id',
  },
  failedCycleAction: {
    resume: 'RESUME',
    stop: 'STOP',
  },
  status: {
    active: 'ACTIVE',
    inactive: 'INACTIVE',
    pending: 'PENDING',
  },
});

Object.assign(Recurring.prototype, {
  createPlan,
  editPlan,
  getPlan,
  deactivatePlan,
  createSchedule,
  getSchedule,
  editSchedule,
  getCycle,
  getAllCycles,
  editCycle,
  cancelCycle,
});

module.exports = Recurring;
