import { XenditOptions } from '../xendit_opts';
import {
  Interval as IntervalEnum,
  Action as ActionEnum,
} from './manage_payments';
import { createPayment, getPayment, editPayment } from './manage_payments';
import { stopPayment, pausePayment, resumePayment } from './operate_payments';

export default class RecurringPayment {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof RecurringPayment;
  static Interval: {
    Day: IntervalEnum;
    Week: IntervalEnum;
    Month: IntervalEnum;
  };
  static Action: {
    Stop: ActionEnum;
    Ignore: ActionEnum;
  };
  createPayment: typeof createPayment;
  getPayment: typeof getPayment;
  editPayment: typeof editPayment;
  stopPayment: typeof stopPayment;
  pausePayment: typeof pausePayment;
  resumePayment: typeof resumePayment;
}
