/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */


import * as runtime from '../../runtime';
import type {
  Balance,
  ServerError,
  ValidationError,
} from '../models';
import {
    BalanceFromJSON,
    BalanceToJSON,
    ServerErrorFromJSON,
    ServerErrorToJSON,
    ValidationErrorFromJSON,
    ValidationErrorToJSON,
} from '../models';

export interface GetBalanceRequest {
    accountType?: GetBalanceAccountTypeEnum;
    currency?: string;
    forUserId?: string;
    idempotencyKey?: string;
}

/**
 * 
 */
export class BalanceApi extends runtime.BaseAPI {

    secretKey: string = "";
    xenditURL: string = "";

    constructor({secretKey, xenditURL}: {secretKey: string, xenditURL?: string}) {
        const conf = new runtime.Configuration({
            basePath: xenditURL || 'https://api.xendit.co'
        })
        super(conf)
        this.secretKey = secretKey;
    }

    /**
     * Retrieves balance for your business, defaults to CASH type
     * Retrieves balances for a business, default to CASH type
     */
    private async getBalanceRaw(requestParameters: GetBalanceRequest): Promise<runtime.ApiResponse<Balance>> {
        const queryParameters: any = {};

        if (requestParameters.accountType !== undefined) {
            queryParameters['account_type'] = requestParameters.accountType;
        }

        if (requestParameters.currency !== undefined) {
            queryParameters['currency'] = requestParameters.currency;
        }

        const headerParameters: runtime.HTTPHeaders = {};
        headerParameters["Authorization"] = "Basic " + btoa(this.secretKey + ":");

        if (requestParameters.forUserId !== undefined && requestParameters.forUserId !== null) {
            headerParameters['for-user-id'] = String(requestParameters.forUserId);
        }

        if (requestParameters.idempotencyKey !== undefined && requestParameters.idempotencyKey !== null) {
            headerParameters['idempotency-key'] = String(requestParameters.idempotencyKey);
        }

        const response = await this.request({
            path: `/balance`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => BalanceFromJSON(jsonValue));
    }

    /**
     * Retrieves balance for your business, defaults to CASH type
     * Retrieves balances for a business, default to CASH type
     */
    async getBalance(requestParameters: GetBalanceRequest = {}): Promise<Balance> {
        const response = await this.getBalanceRaw(requestParameters);
        return await response.value();
    }

}

/**
 * @export
 */
export const GetBalanceAccountTypeEnum = {
    Cash: 'CASH',
    Holding: 'HOLDING',
    Tax: 'TAX'
} as const;
export type GetBalanceAccountTypeEnum = typeof GetBalanceAccountTypeEnum[keyof typeof GetBalanceAccountTypeEnum];
