export interface CreateScheduleRequest {
  referenceId: string;
  businessId: string;
  interval: Interval | null;
  intervalCount: number;
  totalRecurrence?: number;
  anchorDate?: string;
  retryInterval?: Interval | null;
  retryIntervalCount?: number;
  totalRetry?: number | null;
  failedAttemptNotifications?: Array<number>;
}

export interface UpdateScheduleRequest {
  id: string;
  businessId: string;
  interval: Interval | null;
  intervalCount: number;
  totalRecurrence?: number;
  anchorDate?: string;
  retryInterval?: Interval | null;
  updateScheduledCycle?: boolean;
  retryIntervalCount?: number;
  totalRetry?: number | null;
  failedAttemptNotifications?: Array<number>;
}

export interface RecurringSchedule {
  id: string;
  reference_id: string;
  business_id: string;
  interval: Interval | null;
  interval_count: number;
  total_recurrence?: number | null;
  anchor_date?: string;
  retry_interval?: Interval | null;
  retry_interval_count?: number | null;
  total_retry?: number | null;
  failed_attempt_notifications?: Array<number>;
  created?: string;
  updated?: string;
}

export enum Currency {
  Php = 'PHP',
  Idr = 'IDR',
}

export enum Interval {
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  Null = 'null',
}

export function createSchedule(
  data: CreateScheduleRequest,
): Promise<RecurringSchedule>;

export function getSchedule(data: {
  id: string;
  businessId: string;
}): Promise<RecurringSchedule>;

export function editSchedule(
  data: UpdateScheduleRequest,
): Promise<RecurringSchedule>;
