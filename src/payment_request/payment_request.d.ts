import { XenditOptions } from '../xendit_opts';

enum PaymentRequestCurrencies {
  IDR = 'IDR',
  PHP = 'PHP',
}

enum PaymentRequestCountries {
  ID = 'ID',
  PH = 'PH',
}

enum PaymentRequestRedeemPoints {
  RedeemNone = 'REDEEM_NONE',
  RedeemAll = 'REDEEM_ALL',
}

enum PaymentRequestType {
  Card = 'CARD',
  EWallet = 'EWALLET',
  DirectDebit = 'DIRECT_DEBIT',
  OverTheCounter = 'OVER_THE_COUNTER',
  QRCode = 'QR_CODE',
  VirtualAccount = 'VIRTUAL_ACCOUNT',
}

enum PaymentRequestStatuses {
  Succeeded = 'SUCCEEDED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  RequiresAction = 'REQUIRE_ACTIONS',
}

interface PaymentRequestChannelProperties {
  redeem_points: PaymentRequestRedeemPoints;
  success_return_url?: string;
  failure_return_url?: string;
  cancel_return_url?: string;
  require_auth?: string;
}

export = class PaymentRequest {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof PaymentRequest;

  createPaymentRequest(data: {
    currency: PaymentRequestCurrencies;
    amount: number;
    reference_id?: string;
    customer_id?: string;
    country: PaymentRequestCountries;
    description?: string;
    payment_method: object;
    channel_properties?: PaymentRequestChannelProperties;
    metadata?: object;
    idempotencty_key?: string;
    for_user_id?: string;
  }): Promise<object>;

  confirmPaymentRequest(data: {
    id: string;
    auth_code: string;
    idempotencty_key?: string;
    for_user_id?: string;
  }): Promise<object>;

  resendPaymentRequest(data: {
    id: string;
    idempotencty_key?: string;
    for_user_id?: string;
  }): Promise<object>;

  getPaymentRequestById(data: {
    id: string;
    for_user_id?: string;
  }): Promise<object>;

  listPaymentRequest(data: {
    id?: string;
    reference_id?: string;
    customer_id?: string;
    type?: PaymentRequestType;
    channel_code?: string;
    status?: PaymentRequestStatuses;
    limit?: number;
    after_id?: string;
    before_id?: string;
    for_user_id?: string;
  }): Promise<object>;
};
