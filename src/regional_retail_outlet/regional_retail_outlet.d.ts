import { XenditOptions } from '../xendit_opts';

type ChannelCode = '7ELEVEN' | '7ELEVEN_CLIQQ' | 'CEBUANA' | 'ECPAY' | 'LBC' | 'DP_PALAWAN' | 'DP_MLHUILLIER' | 'DP_ECPAY_LOAN' | 'DP_RD_PAWNSHOP' | 'DP_CVM' | 'DP_ECPAY_SCHOOL';

type Currency = 'PHP';

export = class RegionalRetailOutlet {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof RetailOutlet;
  createPaymentCode(data: {
    referenceId: string;
    channelCode: ChannelCode;
    amount: number;
    currency: Currency;
    customerName: string;
    market: string;
    paymentCode?: string;
    expiresAt?: Date;
    isSingleUse?: boolean;
    description?: string;
    metadata?: object;
  }): Promise<object>;
  updatePaymentCode(data: {
    id: string;
    amount?: number;
    currency?: Currency;
    customerName?: string;
    expiresAt?: Date;
    description?: string;
  }): Promise<object>;
  getPaymentCode(data: {
    id: string;
  }): Promise<object>;
};
