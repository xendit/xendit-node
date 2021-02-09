import { XenditOptions } from '../xendit_opts';

enum CreateSupportWalletTypes {
  OVO = 'OVO',
  Dana = 'DANA',
  Linkaja = 'LINKAJA',
}

enum GetSupportWalletTypes {
  OVO = 'OVO',
  Dana = 'DANA',
}

interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CreatePaymentProps {
  externalID: string;
  amount: number;
  phone?: string;
  expirationDate?: Date;
  callbackURL?: string;
  redirectURL?: string;
  items?: PaymentItem[];
  ewalletType: CreateSupportWalletTypes;
  xApiVersion?: string;
}

enum Currency {
  IDR = 'IDR',
  PHP = 'PHP',
}

enum ChannelCode {
  ID_OVO = 'ID_OVO',
  ID_DANA = 'ID_DANA',
  ID_LINKAJA = 'ID_LINKAJA',
  ID_SHOPEEPAY = 'ID_SHOPEEPAY',
  PH_PAYMAYA = 'PH_PAYMAYA',
}

interface OVOChannelProps {
  mobileNumber: string;
}

interface PaymayaChannelProps {
  successRedirectURL: string;
  failureRedirectURL: string;
  cancelRedirectURL: string;
}

interface OtherChannelProps {
  successRedirectURL: string;
}

interface Basket {
  referenceID: string;
  name: string;
  category: string;
  currency: string;
  price: number;
  quantity: number;
  type: string;
  url?: string;
  description?: string;
  subCategory?: string;
  metadata?: object;
}

interface CreateEwalletChargeProps {
  referenceID: string;
  currency: Currency;
  amount: number;
  checkoutMethod: string;
  channelCode?: ChannelCode;
  channelProperties?: OVOChannelProps | PaymayaChannelProps | OtherChannelProps;
  customerID?: string;
  basket?: Basket[];
  metadata?: object;
}

interface GetPaymentProps {
  externalID: string;
  ewalletType: GetSupportWalletTypes;
}

interface GetEwalletChargeStatusProps {
  chargeID: string;
}

export = class EWallet {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof EWallet;
  static Type: {
    OVO: string;
    Dana: string;
    LinkAja: string;
  };
  createPayment(
    data: CreatePaymentProps | CreateEwalletChargeProps,
  ): Promise<object>;
  getPayment(
    data: GetPaymentProps | GetEwalletChargeStatusProps,
  ): Promise<object>;
};
