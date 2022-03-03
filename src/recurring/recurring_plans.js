const {
  createPlan,
  editPlan,
  getPlan,
  deactivatePlan,
} = require('./manage_plans');

const RECURRING_PATH = '/recurring';

class RecurringPlan {
  constructor(options) {
    let aggOpts = Object.assign({}, options);
    if (Object.keys(RecurringPlan._injectedOpts || {}).length) {
      aggOpts = Object.assign({}, options, RecurringPlan._injectedOpts);
    }

    this.opts = aggOpts;
    this.API_ENDPOINT = this.opts.xenditURL + `${RECURRING_PATH}/plans`;
  }

  static _constructorWithInjectedXenditOpts(options) {
    RecurringPlan._injectedOpts = options;
    return RecurringPlan;
  }
}

Object.assign(RecurringPlan, {
  _injectedOpts: {},
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

Object.assign(RecurringPlan.prototype, {
  createPlan,
  editPlan,
  getPlan,
  deactivatePlan,
});

module.exports = RecurringPlan;
