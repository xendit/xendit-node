enum RefundReasons {
  Fraudulent = 'FRAUDULENT',
  Duplicate = 'DUPLICATE',
  RequestedByCustomer = 'REQUESTED_BY_CUSTOMER',
  Cancellation = 'CANCELLATION',
  Others = 'OTHERS',
}

export = class Refund {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Refund;

  createRefund(data: {
    payment_request_id?: string;
    reference_id?: string;
    invoice_id?: string;
    currency?: string;
    amount?: number;
    reason: RefundReasons;
    metadata?: object;
    idempotency_key?: string;
    for_user_id?: string;
  }): Promise<object>;

  listRefunds(data: {
    payment_request_id?: string;
    invoice_id?: string;
    payment_method_type?: string;
    channel_code?: string;
    limit?: number;
    after_id?: string;
    before_id?: string;
    for_user_id?: string;
  }): Promise<object>;

  getRefundById(data: { id: string }): Promise<object>;
};
