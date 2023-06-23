import { XenditOptions } from '../xendit_opts';

export enum PaymentRequestCurrencies {
  IDR = 'IDR',
  PHP = 'PHP',
}

export enum PaymentRequestCountries {
  ID = 'ID',
  PH = 'PH',
}

export enum PaymentRequestInitiator {
  Customer = 'CUSTOMER',
  Merchant = 'MERCHANT',
}

export enum PaymentRequestCaptureMethod {
  Automatic = 'AUTOMATIC',
  Manual = 'MANUAL',
}

export enum PaymentRequestRedeemPoints {
  RedeemNone = 'REDEEM_NONE',
  RedeemAll = 'REDEEM_ALL',
}

export enum PaymentRequestType {
  Card = 'CARD',
  EWallet = 'EWALLET',
  DirectDebit = 'DIRECT_DEBIT',
  OverTheCounter = 'OVER_THE_COUNTER',
  QRCode = 'QR_CODE',
  VirtualAccount = 'VIRTUAL_ACCOUNT',
}

export enum PaymentRequestStatuses {
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
    country?: PaymentRequestCountries;
    description?: string;
    payment_method?: object;
    channel_properties?: PaymentRequestChannelProperties;
    metadata?: object;
    payment_method_id?: string;
    shipping_information?: object;
    initiator?: PaymentRequestInitiator;
    capture_method?: PaymentRequestCaptureMethod;
    idempotency_key?: string;
    for_user_id?: string;
  }): Promise<object>;

  confirmPaymentRequest(data: {
    id: string;
    auth_code: string;
    idempotency_key?: string;
    for_user_id?: string;
  }): Promise<object>;

  resendAuthForPaymentRequest(data: {
    id: string;
    idempotency_key?: string;
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
