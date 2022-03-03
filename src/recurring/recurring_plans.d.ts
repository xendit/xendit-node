import { XenditOptions } from '../xendit_opts';
import {
  ImmediateActionType,
  NotificationChannel,
  NotificationConfigLocale,
  RecurringAction,
  FailingCycleAction,
  RecurringPlanStatus,
} from './manage_plans';
import { createPlan, editPlan, getPlan, deactivatePlan } from './manage_plans';

export default class RecurringPlan {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof RecurringPlan;
  static recurringAction: RecurringAction;
  static immediateActionType: ImmediateActionType;
  static notificationChannel: NotificationChannel;
  static locale: NotificationConfigLocale;
  static failedCycleAction: FailingCycleAction;
  static status: RecurringPlanStatus;

  createPlan: typeof createPlan;
  editPlan: typeof editPlan;
  getPlan: typeof getPlan;
  deactivatePlan: typeof deactivatePlan;
}
