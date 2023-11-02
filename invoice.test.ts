import Xendit from ".."
import * as dotenv from 'dotenv'
import { InvoiceApi } from "../invoice/apis"
import { TestUtil } from "./utils/test_util"

let instanceAPI: InvoiceApi
let sampleDatum : string

describe("Invoice API", () => {
    beforeAll(() => {
        dotenv.config({ path: '.env.test' })
        instanceAPI = new Xendit({
            secretKey: process.env.DEVELOPMENT_API_KEY,
            xenditURL: "https://api.xendit.co"
        }).Invoice
    })

    it("createInvoice", async () => {
        try {
            const externalId = TestUtil.generateUniqueIdForBusiness(process.env.BUSINESS_ID)
            const response = await instanceAPI.createInvoice({
                data: {
                    externalId,
                    amount: 1000,
                }
            })
            sampleDatum = response.id

            expect(response).toBeDefined();
            expect(response.amount).toBe(1000);
            expect(response.externalId).toBe(externalId);
        } catch (error) {
            console.log({
                error_code: error.errorCode,
                message: error.errorMessage,
                status: error.status,
            });

            if (
                !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
            ) {
                throw error
            };
        }
    })

    it("getInvoices", async () => {
        try {
            const response = await instanceAPI.getInvoices()
            if (response.length > 0) {
                sampleDatum = response[0].id
            }

            expect(response).toBeDefined()
        } catch (error) {
            console.log({
                error_code: error.errorCode,
                message: error.errorMessage,
                status: error.status,
            });

            if (
                !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
            ) {
                throw error
            };
        }
    })

    it("getInvoiceById", async () => {
        try {
            const response = await instanceAPI.getInvoiceById({
                invoiceId: sampleDatum
            });

            expect(response).toBeDefined()
            expect(response.id).toBe(sampleDatum)
        } catch (error) {
            console.log({
                error_code: error.errorCode,
                message: error.errorMessage,
                status: error.status,
            });

            if (
                !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
            ) {
                throw error
            };
        }
    })

    it("expireInvoice", async () => {
        try {
            const response = await instanceAPI.expireInvoice({
                invoiceId: sampleDatum
            })

            expect(response).toBeDefined()
            expect(response.status).toBe("EXPIRED")
        } catch (error) {
            console.log({
                error_code: error.errorCode,
                message: error.errorMessage,
                status: error.status,
            });

            if (
                !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
            ) {
                throw error
            };
        }
    })
})
