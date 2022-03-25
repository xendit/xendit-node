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
import {
  getCycle,
  editCycle,
  getAllCycles,
  cancelCycle,
} from './manage_cycles';
import { createSchedule, getSchedule, editSchedule } from './manage_schedules';

export default class Recurring {
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

  createSchedule: typeof createSchedule;
  getSchedule: typeof getSchedule;
  editSchedule: typeof editSchedule;

  getCycle: typeof getCycle;
  editCycle: typeof editCycle;
  getAllCycles: typeof getAllCycles;
  cancelCycle: typeof cancelCycle;
}
