/* tslint:disable */
/* eslint-disable */
/**
 * NOTE: This file is auto generated by Xendit.
 * Do not edit the class manually.
 * Improvements? Share your ideas at https://github.com/xendit/xendit-node
 */


/**
 * Direct Debit Channel Code
 * @export
 */
export const DirectDebitChannelCode = {
    BcaKlikpay: 'BCA_KLIKPAY',
    BcaOneklik: 'BCA_ONEKLIK',
    Bdo: 'BDO',
    Bpi: 'BPI',
    BpiRecurring: 'BPI_RECURRING',
    Bri: 'BRI',
    BniAutopay: 'BNI_AUTOPAY',
    Chinabank: 'CHINABANK',
    Cimbniaga: 'CIMBNIAGA',
    Mtb: 'MTB',
    Rcbc: 'RCBC',
    Ubp: 'UBP',
    Mandiri: 'MANDIRI',
    Bbl: 'BBL',
    Scb: 'SCB',
    Ktb: 'KTB',
    Bay: 'BAY',
    KbankMb: 'KBANK_MB',
    BayMb: 'BAY_MB',
    KtbMb: 'KTB_MB',
    BblMb: 'BBL_MB',
    ScbMb: 'SCB_MB',
    BdoEpay: 'BDO_EPAY',
    UbpEada: 'UBP_EADA',
    UbpDebitPull: 'UBP_DEBIT_PULL',
    AffinFpx: 'AFFIN_FPX',
    AgroFpx: 'AGRO_FPX',
    AllianceFpx: 'ALLIANCE_FPX',
    AmbankFpx: 'AMBANK_FPX',
    IslamFpx: 'ISLAM_FPX',
    MuamalatFpx: 'MUAMALAT_FPX',
    BocFpx: 'BOC_FPX',
    RakyatFpx: 'RAKYAT_FPX',
    BsnFpx: 'BSN_FPX',
    CimbFpx: 'CIMB_FPX',
    HlbFpx: 'HLB_FPX',
    HsbcFpx: 'HSBC_FPX',
    KfhFpx: 'KFH_FPX',
    Mayb2EFpx: 'MAYB2E_FPX',
    Mayb2UFpx: 'MAYB2U_FPX',
    OcbcFpx: 'OCBC_FPX',
    PublicFpx: 'PUBLIC_FPX',
    RhbFpx: 'RHB_FPX',
    SchFpx: 'SCH_FPX',
    UobFpx: 'UOB_FPX',
    AffinFpxBusiness: 'AFFIN_FPX_BUSINESS',
    AgroFpxBusiness: 'AGRO_FPX_BUSINESS',
    AllianceFpxBusiness: 'ALLIANCE_FPX_BUSINESS',
    AmbankFpxBusiness: 'AMBANK_FPX_BUSINESS',
    IslamFpxBusiness: 'ISLAM_FPX_BUSINESS',
    MuamalatFpxBusiness: 'MUAMALAT_FPX_BUSINESS',
    BnpFpxBusiness: 'BNP_FPX_BUSINESS',
    CimbFpxBusiness: 'CIMB_FPX_BUSINESS',
    CitibankFpxBusiness: 'CITIBANK_FPX_BUSINESS',
    DeutscheFpxBusiness: 'DEUTSCHE_FPX_BUSINESS',
    HlbFpxBusiness: 'HLB_FPX_BUSINESS',
    HsbcFpxBusiness: 'HSBC_FPX_BUSINESS',
    RakyatFpxBusiness: 'RAKYAT_FPX_BUSINESS',
    KfhFpxBusiness: 'KFH_FPX_BUSINESS',
    Mayb2EFpxBusiness: 'MAYB2E_FPX_BUSINESS',
    OcbcFpxBusiness: 'OCBC_FPX_BUSINESS',
    PublicFpxBusiness: 'PUBLIC_FPX_BUSINESS',
    RhbFpxBusiness: 'RHB_FPX_BUSINESS',
    SchFpxBusiness: 'SCH_FPX_BUSINESS',
    UobFpxBusiness: 'UOB_FPX_BUSINESS',
    BdoOnlineBanking: 'BDO_ONLINE_BANKING',
    BpiOnlineBanking: 'BPI_ONLINE_BANKING',
    UnionbankOnlineBanking: 'UNIONBANK_ONLINE_BANKING',
    BocOnlineBanking: 'BOC_ONLINE_BANKING',
    ChinabankOnlineBanking: 'CHINABANK_ONLINE_BANKING',
    InstapayOnlineBanking: 'INSTAPAY_ONLINE_BANKING',
    LandbankOnlineBanking: 'LANDBANK_ONLINE_BANKING',
    MaybankOnlineBanking: 'MAYBANK_ONLINE_BANKING',
    MetrobankOnlineBanking: 'METROBANK_ONLINE_BANKING',
    PnbOnlineBanking: 'PNB_ONLINE_BANKING',
    PsbankOnlineBanking: 'PSBANK_ONLINE_BANKING',
    PesonetOnlineBanking: 'PESONET_ONLINE_BANKING',
    RcbcOnlineBanking: 'RCBC_ONLINE_BANKING',
    RobinsonsBankOnlineBanking: 'ROBINSONS_BANK_ONLINE_BANKING',
    SecurityBankOnlineBanking: 'SECURITY_BANK_ONLINE_BANKING',
    AutodebitUbp: 'AUTODEBIT_UBP',
    AutodebitBpi: 'AUTODEBIT_BPI',
    GbwBblMobileBanking: 'GBW_BBL_MOBILE_BANKING',
    GbwKbankMobileBanking: 'GBW_KBANK_MOBILE_BANKING',
    GbwKtbMobileBanking: 'GBW_KTB_MOBILE_BANKING',
    GbwScbMobileBanking: 'GBW_SCB_MOBILE_BANKING',
    GbwBayMobileBanking: 'GBW_BAY_MOBILE_BANKING',
    GbwBbl: 'GBW_BBL',
    GbwKbank: 'GBW_KBANK',
    GbwKtb: 'GBW_KTB',
    GbwScb: 'GBW_SCB',
    GbwBay: 'GBW_BAY',
    XenditEnumDefaultFallback: "UNKNOWN_ENUM_VALUE"
} as const;
export type DirectDebitChannelCode = typeof DirectDebitChannelCode[keyof typeof DirectDebitChannelCode];


export function DirectDebitChannelCodeFromJSON(json: any): DirectDebitChannelCode {
    return DirectDebitChannelCodeFromJSONTyped(json, false);
}

export function DirectDebitChannelCodeFromJSONTyped(json: any, ignoreDiscriminator: boolean): DirectDebitChannelCode {
    if (json !== "" || json !== null) {
        const key = Object.keys(DirectDebitChannelCode)[Object.values(DirectDebitChannelCode).indexOf(json)]
        return DirectDebitChannelCode[key] === undefined ?
            DirectDebitChannelCode['XenditEnumDefaultFallback'] : DirectDebitChannelCode[key]
    }
    return json as DirectDebitChannelCode;
}

export function DirectDebitChannelCodeToJSON(value?: DirectDebitChannelCode | null): any {
    return value as any;
}

