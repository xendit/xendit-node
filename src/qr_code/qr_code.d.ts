import { XenditOptions } from '../xendit_opts';

enum QrCodeTypes {
  Dynamic = 'DYNAMIC',
  Static = 'STATIC',
}

export = class QrCode {
  constructor({});
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof QrCode;
  static Type: {
    Dynamic: string;
    Static: string;
  };
  createCode(data: {
    externalID: string;
    type: QrCodeTypes;
    callbackURL: string;
    amount?: number;
  }): Promise<object>;
  getCode(data: { externalID: string }): Promise<object>;
  getPayments(data: {
    externalID: string;
    from?: string;
    to?: string;
    limit?: number;
  }): Promise<object>;
  simulate(data: { externalID: string; amount?: number }): Promise<object>;
};
