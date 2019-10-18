import Errors from './errors';
import { CardService } from './card';

export interface XenditOptions {
  publicKey: string;
  secretKey: string;
  xenditURL?: string;
}

export = class Xendit {
  constructor(opts: XenditOptions);
  static Errors = Errors;
  Card: typeof CardService;
};
