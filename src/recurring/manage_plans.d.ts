import { CreateScheduleRequest } from './manage_schedules';
export interface CreatePlanRequest {
  businessId: string;
  referenceId: string;
  customerId: string;
  recurringAction: RecurringAction;
  currency: Currency;
  amount: number;
  paymentMethods?: Array<PaymentMethodIdRanked>;
  scheduleId?: string;
  schedule?: Omit<CreateScheduleRequest, 'businessId'>;
  immediateActionType?: ImmediateActionType | null;
  notificationConfig?: NotificationConfig | null;
  failedCycleAction?: FailingCycleAction;
  metadata?: object | null;
}

export interface UpdatePlanRequest {
  id: string;
  businessId: string;
  customerId?: string;
  currency?: Currency;
  amount?: number;
  paymentMethods?: Array<PaymentMethodIdRanked>;
  notificationConfig?: NotificationConfig | null;
  updateScheduledCycle?: boolean;
  metadata?: object | null;
  description?: string;
}

export interface RecurringPlan {
  id: string;
  reference_id: string;
  business_id: string;
  customer_id: string | null;
  recurring_action: RecurringAction;
  recurring_cycle_count: number;
  currency: Currency;
  amount: number;
  status: RecurringPlanStatus;
  created: string;
  updated?: string;
  payment_methods?: Array<PaymentMethodIdRanked>;
  schedule_id: string;
  immediate_action_type?: ImmediateActionType | null;
  notification_config?: NotificationConfig | null;
  failed_cycle_action?: FailingCycleAction;
  metadata?: object | null;
  description?: string;
}

export enum RecurringAction {
  PAYMENT = 'PAYMENT',
  DISBURSEMENT = 'DISBURSEMENT',
}
export enum ImmediateActionType {
  FULL_AMOUNT = 'FULL_AMOUNT',
}
export interface NotificationConfig {
  recurringCreated?: Array<NotificationChannel>;
  recurringSucceeded?: Array<NotificationChannel>;
  recurringFailed?: Array<NotificationChannel>;
  locale?: NotificationConfigLocale;
}
export enum NotificationChannel {
  WHATSAPP = 'WHATSAPP',
  SMS = 'SMS',
  EMAIL = 'EMAIL',
}
export enum NotificationConfigLocale {
  en = 'en',
  id = 'id',
}
export enum FailingCycleAction {
  RESUME = 'RESUME',
  STOP = 'STOP',
}
export enum Currency {
  PHP = 'PHP',
  IDR = 'IDR',
}
export enum RecurringPlanStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}
export interface PaymentMethodIdRanked {
  paymentMethodId: string;
  rank: number;
}

export function createPlan(data: CreatePlanRequest): Promise<RecurringPlan>;
export function editPlan(data: UpdatePlanRequest): Promise<RecurringPlan>;
export function getPlan(data: {
  id: string;
  businessId: string;
}): Promise<RecurringPlan>;
export function deactivatePlan(data: {
  id: string;
  businessId: string;
}): Promise<RecurringPlan>;
