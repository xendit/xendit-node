process.env.NODE_ENV = 'test';

const Xendit = require('../../src/xendit');
const recurringPlansTest = require('./recurring_plan.test');
const recurringScheduleTest = require('./recurring_schedule.test');
const recurringCycleTest = require('./recurring_cycle.test');

const x = new Xendit({
  secretKey: 'fake_secret_key',
});

describe('Recurring Service', function() {
  recurringPlansTest(x);
  recurringScheduleTest(x);
  recurringCycleTest(x);
});
