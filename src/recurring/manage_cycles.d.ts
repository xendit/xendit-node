import { RecurringAction, Currency } from './manage_plans';

export interface List<T> {
  data: T[];
  has_more: boolean;
}

export interface UpdateCycleRequest {
  id: string;
  businessId: string;
  planId: string;
  scheduledTimestamp: string;
  currency: Currency;
  amount: number;
  metadata?: object | null;
}

export interface RecurringCycle {
  id: string;
  type: RecurringCycleType;
  reference_id?: string;
  plan_id: string;
  customer_id: string | null;
  recurring_action: RecurringAction;
  attempt_count: number;
  cycle_number: number;
  attempt_details: Array<RecurringCycleAttempt>;
  status: RecurringCycleStatus;
  scheduled_timestamp: string;
  created: string;
  updated: string;
  currency: Currency;
  amount: number;
  metadata?: object | null;
}

export interface RecurringCycleAttempt {
  attempt_number: number;
  created: string;
  action_id: string | null;
  status: RecurringCycleAttemptStatus;
  failure_code?: string | null;
  next_retry_timestamp: string | null;
}

export enum RecurringCycleAttemptStatus {
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

export enum RecurringCycleType {
  SCHEDULED = 'SCHEDULED',
  IMMEDIATE = 'IMMEDIATE',
}

export enum RecurringCycleStatus {
  SCHEDULED = 'SCHEDULED',
  PENDING = 'PENDING',
  RETRYING = 'RETRYING',
  FAILED = 'FAILED',
  SUCCEEDED = 'SUCCEEDED',
  CANCELLED = 'CANCELLED',
}

export enum CycleDashboardSearchType {
  CYCLE_ID = 'id',
  REFERENCE_ID = 'reference_id',
}

export function editCycle(data: UpdateCycleRequest): Promise<RecurringCycle>;
export function getCycle(data: {
  id: string;
  planId: string;
  businessId: string;
}): Promise<RecurringCycle>;
export function cancelCycle(data: {
  id: string;
  planId: string;
  businessId: string;
}): Promise<RecurringCycle>;
export function getAllCycles(data: {
  businessId: string;
  planId: string;
  limit?: number;
  beforeId?: string;
  afterId?: string;
  searchType?: CycleDashboardSearchType;
  searchValue?: string;
}): Promise<List<RecurringCycle>>;
