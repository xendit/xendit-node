export interface CreatePlanRequest {
  reference_id: string;
  customer_id: string;
  recurring_action: RecurringAction;
  currency: Currency;
  amount: number;
  payment_methods?: Array<PaymentMethodIdRanked>;
  schedule_id: string;
  immediate_action_type?: ImmediateActionType | null;
  notification_config?: NotificationConfig | null;
  failed_cycle_action?: FailingCycleAction;
  metadata?: object | null;
}

export interface UpdatePlanRequest {
  customer_id?: string;
  currency?: Currency;
  amount?: number;
  payment_methods?: Array<PaymentMethodIdRanked>;
  notification_config?: NotificationConfig | null;
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
  recurring_created?: Array<NotificationChannel>;
  recurring_succeeded?: Array<NotificationChannel>;
  recurring_failed?: Array<NotificationChannel>;
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
  payment_method_id: string;
  rank: number;
}

export function createPlan(data: CreatePlanRequest): Promise<RecurringPlan>;
export function editPlan(data: UpdatePlanRequest): Promise<RecurringPlan>;
export function getPlan(data: { id: string }): Promise<RecurringPlan>;
export function deactivatePlan(data: { id: string }): Promise<RecurringPlan>;
