import { createCharge, captureCharge, getCharge } from './charge';
import { createRefund } from './refund';
import { createAuthorization, reverseAuthorization } from './authorization';
import CardStatus from './card_status';
import { XenditOptions } from '../xendit_opts';

export = class Card {
  constructor({});
  static Status = CardStatus;
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Card;
  createCharge = createCharge;
  captureCharge = captureCharge;
  getCharge = getCharge;
  createAuthorization = createAuthorization;
  reverseAuthorization = reverseAuthorization;
  createRefund = createRefund;
};
