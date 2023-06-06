import { XenditOptions } from '../xendit_opts';

enum PaymentMethodV2Types {
  Card = 'CARD',
  eWallet = 'EWALLET',
  DirectDebit = 'DIRECT_DEBIT',
  OverTheCounter = 'OVER_THE_COUNTER',
  QRCODE = 'QR_CODE',
  VitrualAccount = 'VIRTUAL_ACCOUNT',
}

enum PaymentMenthodV2Reusabilities {
  OneTimeUse = 'ONE_TIME_USE',
  MultipleUse = 'MULTIPLE_USE',
}

enum CreatePaymentMenthodV2Countries {
  ID = 'ID',
  PH = 'PH',
}

enum EWalletChannelCodes {
  Dana = 'DANA',
  OVO = 'OVO',
  LinkAja = 'LINKAJA',
  Astrapay = 'ASTRAPAY',
  JeniusPay = 'JENIUSPAY',
  ShopeePay = 'SHOPEEPAY',
  GrabPay = 'GRABPAY',
  Paymaya = 'PAYMAYA',
  GCash = 'GCASH',
}

enum DirectDebitChannelCodes {
  BRI = 'BRI',
  Mandiri = 'MANDIRI',
  BPI = 'BPI',
  UBP = 'UBP',
  RCBC = 'RCBC',
  ChinaBank = 'CHINABANK',
}

enum CardCurrencies {
  IDR = 'IDR',
  PHP = 'PHP',
  USD = 'USD',
}

enum OverTheCounterChannelCodes {
  Alfamart = 'ALFAMART',
  Indomaret = 'INDOMARET',
  '7Eleven' = '7ELEVEN',
  '7ElevenCLIQQ' = '7ELEVEN_CLIQQ',
  Cebuana = 'CEBUANA',
  ECPay = 'ECPAY',
  Palawan = 'PALAWAN',
  MLhuillier = 'MLHUILLIER',
  DragonLoanECPAY = 'DRAGONLOAN_ECPAY',
}

enum OverTheCounterCurrencies {
  IDR = 'IDR',
  PHP = 'PHP',
}

enum VirtualAccountChannelCodes {
  BCA = 'BCA',
  BSI = 'BSI',
  BJB = 'BJB',
  CIMB = 'CIMB',
  SahabatSampoerna = 'SAHABAT_SAMPOERNA',
  Artajasa = 'ARTAJASA',
  BRI = 'BRI',
  BNI = 'BNI',
  Mandiri = 'MANDIRI',
  Permata = 'PERMATA',
}

enum VirtualAccountCurrencies {
  IDR = 'IDR',
}

enum QRISChannelCodes {
  QRIS = 'QRIS',
}

enum QRISCurrencies {
  IDR = 'IDR',
}

enum PaymentMethodV2Statuses {
  Succeeded = 'SUCCEEDED',
  Failed = 'FAILED',
  Pending = 'PENDING',
}

interface BillingInformationItems {
  country: string;
  street_line1?: string;
  street_line2?: string;
  city?: string;
  province_state?: string;
  postal_code?: string;
}

interface EwalletItems {
  channel_code: EWalletChannelCodes;
  channel_properties: object;
}

interface DirectDebitItems {
  channel_code: DirectDebitChannelCodes;
  channel_properties: object;
}

interface CardItems {
  currency: CardCurrencies;
  channel_properties: object;
  card_information: {
    card_number: string;
    expiry_month: string;
    expiry_year: string;
    cardholder_name?: string;
  };
}

interface OverTheCounterItems {
  channel_code: OverTheCounterChannelCodes;
  currency?: OverTheCounterCurrencies;
  amount?: number;
  channel_properties: object;
}

interface VirtualAccountItems {
  channel_code: VirtualAccountChannelCodes;
  currency?: VirtualAccountCurrencies;
  amount?: number;
  channel_properties: object;
}

interface QRISItems {
  channel_code: QRISChannelCodes;
  currency?: QRISCurrencies;
  amount?: number;
}

interface UpdateOverTheCounterItems {
  amount?: number;
  channel_properties: object;
}

interface UpdateVirtualAccountItems {
  amount?: number;
  channel_properties: object;
}

interface ListPaymentMethodV2StatusItems {
  status?: PaymentMethodV2Statuses;
}

export = class PaymentMethodV2 {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof PaymentMethodV2;
  createPaymentMethodV2(data: {
    type: PaymentMethodV2Types;
    reusability: PaymentMenthodV2Reusabilities;
    reference_id?: string;
    customer_id?: string;
    country?: CreatePaymentMenthodV2Countries;
    description?: string;
    billing_information?: BillingInformationItems;
    metadata?: object;
    ewallet?: EwalletItems;
    direct_debit?: DirectDebitItems;
    card?: CardItems;
    over_the_counter?: OverTheCounterItems;
    virtual_account?: VirtualAccountItems;
    qr_code?: QRISItems;
    for_user_id?: string;
    idempotency_key?: string;
  }): Promise<object>;

  listPaymentMethodV2(data: {
    id: string;
    type?: PaymentMethodV2Types;
    reusability?: PaymentMenthodV2Reusabilities;
    reference_id?: string;
    customer_id?: string;
    limit?: string;
    after_id?: string;
    before_id?: string;
    for_user_id?: string;
  }): Promise<object>;

  authorizePaymentMethodV2(data: {
    id: string;
    auth_code: string;
    for_user_id?: string;
    idempotency_key?: string;
  }): Promise<object>;

  getPaymentMethodByIdV2(data: {
    id: string;
    for_user_id?: string;
  }): Promise<object>;

  updatePaymentMethodV2(data: {
    id: string;
    reference_id?: string;
    description?: string;
    metadata?: object;
    status?: string;
    reusability?: PaymentMenthodV2Reusabilities;
    over_the_counter?: UpdateOverTheCounterItems;
    virtual_account?: UpdateVirtualAccountItems;
    for_user_id?: string;
  }): Promise<object>;

  expirePaymentMethodV2(data: {
    id: string;
    for_user_id?: string;
    idempotency_key?: string;
  }): Promise<object>;

  listPaymentsByPaymentMethodIdV2(data: {
    id: string;
    payment_request_id?: string;
    reference_id?: string;
    status?: ListPaymentMethodV2StatusItems;
    limit?: number;
    after_id?: string;
    before_id?: string;
    created?: string;
    updated?: string;
    for_user_id?: string;
  }): Promise<object>;
};
