enum Interval {
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
}
enum Action {
  Stop = 'STOP',
  Ignore = 'IGNORE',
}

export function createPayment(data: {
  externalID: string;
  payerEmail: string;
  description: string;
  amount: number;
  interval: Interval;
  intervalCount: number;
  totalRecurrence?: number;
  invoiceDuration?: number;
  shouldSendEmail?: boolean;
  missedPaymentAction?: Action;
  creditCardToken?: string;
  startDate?: Date;
  successRedirectURL?: string;
  failureRedirectURL?: string;
  recharge?: boolean;
  chargeImmediately?: boolean;
  currency?: string;
  rescheduleAt?: Date;
}): Promise<object>;

export function getPayment(data: { id: string }): Promise<object>;

export function editPayment(data: {
  id: string;
  amount?: number;
  creditCardToken?: string;
  interval?: Interval;
  intervalCount?: number;
  shouldSendEmail?: boolean;
  invoiceDuration?: number;
  missedPaymentAction?: Action;
  rescheduleAt?: Date;
}): Promise<object>;
