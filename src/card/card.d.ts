import { createToken } from './token';
import { createCharge, captureCharge, getCharge } from './charge';
import { createAuthetication } from './authentication';
import { createRefund } from './refund';
import { createAuthorization, reverseAuthorization } from './authorization';
import CardStatus from './card_status';
import { XenditOptions } from '../xendit';

export = class Card {
  constructor({});
  static Status = CardStatus;
  static _constructorWithInjectedXenditOpts: (
    opts: XenditOptions,
  ) => typeof Card;
  createToken = createToken;
  createCharge = createCharge;
  createAuthentication = createAuthentication;
  captureCharge = captureCharge;
  getCharge = getCharge;
  createAuthorization = createAuthorization;
  reverseAuthorization = reverseAuthorization;
  createRefund = createRefund;
};
