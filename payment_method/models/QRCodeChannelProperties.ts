/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */

import { exists, mapValues } from '../../runtime';
/**
 * QR Code Channel Properties
 * @export
 * @interface QRCodeChannelProperties
 */
export interface QRCodeChannelProperties {
    /**
     * QR string to be rendered for display to end users. QR string to image rendering are commonly available in software libraries (e.g Nodejs, PHP, Java)
     * @type {string}
     * @memberof QRCodeChannelProperties
     */
    qrString?: string;
    /**
     * 
     * @type {Date}
     * @memberof QRCodeChannelProperties
     */
    expiresAt?: Date;
}

/**
 * Check if a given object implements the QRCodeChannelProperties interface.
 */
export function instanceOfQRCodeChannelProperties(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function QRCodeChannelPropertiesFromJSON(json: any): QRCodeChannelProperties {
    return QRCodeChannelPropertiesFromJSONTyped(json, false);
}

export function QRCodeChannelPropertiesFromJSONTyped(json: any, ignoreDiscriminator: boolean): QRCodeChannelProperties {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'qrString': !exists(json, 'qr_string') ? undefined : json['qr_string'],
        'expiresAt': !exists(json, 'expires_at') ? undefined : (new Date(json['expires_at'])),
    };
}

export function QRCodeChannelPropertiesToJSON(value?: QRCodeChannelProperties | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'qr_string': value.qrString,
        'expires_at': value.expiresAt === undefined ? undefined : (value.expiresAt.toISOString()),
    };
}

