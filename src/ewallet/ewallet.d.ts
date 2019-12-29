import { XenditOptions } from '../xendit_opts';

enum CreateSupportWalletTypes {
  OVO = 'OVO',
  Dana = 'Dana',
  Linkaja = 'LINKAJA',
}

enum GetSupportWalletTypes {
  OVO = 'OVO',
  Dana = 'Dana',
}

interface PaymentItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export = class EWallet {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof EWallet;
  createPayment(data: {
    externalID: string;
    amount: number;
    phone?: string;
    expirationDate?: Date;
    callbackURL?: string;
    redirectURL?: string;
    items?: PaymentItem[];
    ewalletType: CreateSupportWalletTypes;
  }): Promise<object>;
  getPayment(data: {
    externalID: string;
    ewalletType: GetSupportWalletTypes;
  }): Promise<object>;
};
