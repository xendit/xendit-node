/* tslint:disable */
/* eslint-disable */
export * from './runtime';

import { Customer } from './customer';
export { Customer } from './customer';

import { PaymentMethod } from './payment_method';
export { PaymentMethod } from './payment_method';

import { PaymentRequest } from './payment_request';
export { PaymentRequest } from './payment_request';

import { Invoice } from './invoice';
export { Invoice } from './invoice';

import { Payout } from './payout';
export { Payout } from './payout';

import { Transaction, Balance } from './balance_and_transaction';
export { Transaction, Balance } from './balance_and_transaction';

import { Refund } from './refund';
export { Refund } from './refund';


export interface XenditOpts {
  secretKey: string;
  xenditURL?: string;
}
export class Xendit {
  opts: XenditOpts;
  Customer: Customer;
  PaymentMethod: PaymentMethod;
  PaymentRequest: PaymentRequest;
  Invoice: Invoice;
  Payout: Payout;
  Transaction: Transaction;
  Balance: Balance;
  Refund: Refund;


  constructor({ secretKey: _secretKey, xenditURL: _xenditURL }: XenditOpts) {
    const secretKey = _secretKey || ''
    const xenditURL = _xenditURL || 'https://api.xendit.co';

    if (secretKey.startsWith('xnd_development_')) {
      console.warn(`You are using Xendit's TEST secret key. Please use your LIVE secret key when you are ready to go live.`)
    } else if (secretKey.startsWith('xnd_production_')) {
      // do nothing
    } else {
      console.error(`Invalid secret key provided. Please use your Xendit secret key that starts with 'xnd_'`)
    }

    this.opts = {
      secretKey,
      xenditURL
    }


       this.Customer = new Customer(this.opts);
    
       this.PaymentMethod = new PaymentMethod(this.opts);
    
       this.PaymentRequest = new PaymentRequest(this.opts);
    
       this.Invoice = new Invoice(this.opts);
    
       this.Payout = new Payout(this.opts);
    
       this.Transaction = new Transaction(this.opts);
       this.Balance = new Balance(this.opts);
    
       this.Refund = new Refund(this.opts);
    
  }
}

export default Xendit;