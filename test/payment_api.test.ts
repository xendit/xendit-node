import Xendit from ".."
import * as dotenv from 'dotenv'
import { DirectDebitChannelCode, EWalletChannelCode, PaymentMethodReusability, PaymentMethodStatus, PaymentMethodType, PaymentRequestCaptureMethod, PaymentRequestStatus, QRCodeChannelCode, VirtualAccountChannelCode } from "../payment_request/models"
import { TestUtil } from "./utils/test_util"

let xendit: Xendit

const testResponseData = {
    card: {
        createdPaymentMethodId: "",
        createdPaymentRequestId: "",
    },
    directDebit: {
        createdPaymentMethodId: "",
        createdPaymentRequestId: "",
    },
    eWallet: {
        createdPaymentMethodId: "",
        createdPaymentRequestId: "",
    },
    qrCode: {
        createdPaymentMethodId: "",
        createdPaymentRequestId: "",
    },
    va: {
        createdPaymentMethodId: "",
        createdPaymentRequestId: "",
    }
};

describe("Payment API", () => {
    beforeAll(() => {
        dotenv.config({ path: './test/.env.test' })
        xendit = new Xendit({
            secretKey: process.env.DEVELOPMENT_API_KEY,
            xenditURL: "https://api.xendit.co"
        })
    })

    describe("CARD", () => {
        describe("Payment Method", () => {
            it("createPaymentMethod", async () => {
                try {
                    const response = await xendit.PaymentMethod.createPaymentMethod({
                        data: {
                            type: PaymentMethodType.Card,
                            card: {
                                currency: "IDR",
                                channelProperties: {
                                    successReturnUrl: "https://redirect.me/goodstuff",
                                    failureReturnUrl: "https://redirect.me/badstuff"
                                },
                                cardInformation: {
                                    cardNumber: "4000000000001091",
                                    expiryMonth: "12",
                                    expiryYear: "2027",
                                    cvv: "123",
                                    cardholderName: "John Doe"
                                },
                            },
                            reusability: PaymentMethodReusability.OneTimeUse,
                            description: "This is a description.",
                            metadata: {
                                "foo": "bar"
                            }
                        }
                    })

                    testResponseData.card.createdPaymentMethodId = response.id

                    console.log("createPaymentMethod Card", response)
                    expect(response).toBeDefined()
                    expect(response.type).toBe(PaymentMethodType.Card)
                    expect(response.status).toBe(PaymentMethodStatus.Pending)
                    expect(response.reusability).toBe(PaymentMethodReusability.OneTimeUse)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })

            it("getPaymentMethodByID", async () => {
                try {
                    const response = await xendit.PaymentMethod.getPaymentMethodByID({
                        paymentMethodId: testResponseData.card.createdPaymentMethodId,
                    })

                    expect(response).toBeDefined()
                    expect(response.id).toBe(testResponseData.card.createdPaymentMethodId)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })
        })

        describe("Payment Request", () => {
            it("createPaymentRequest", async () => {
                try {
                    const response = await xendit.PaymentRequest.createPaymentRequest({
                        data: {
                            amount: 20000,
                            currency: "IDR",
                            paymentMethodId: testResponseData.card.createdPaymentMethodId,
                            description: "This is a description.",
                            metadata: {
                                foo: "bar"
                            }
                        }
                    })

                    testResponseData.card.createdPaymentRequestId = response.id

                    console.log("createPaymentRequest Card", response)
                    expect(response).toBeDefined()
                    expect(response.status).toBe(PaymentRequestStatus.RequiresAction)
                    expect(response.captureMethod).toBe(PaymentRequestCaptureMethod.Automatic)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })

            it("getPaymentRequestByID", async () => {
                try {
                    const response = await xendit.PaymentRequest.getPaymentRequestByID({
                        paymentRequestId: testResponseData.card.createdPaymentRequestId,
                    })

                    expect(response).toBeDefined()
                    expect(response.id).toBe(testResponseData.card.createdPaymentRequestId)
                    expect(response.paymentMethod.id).toBe(testResponseData.card.createdPaymentMethodId)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })
        })
    })

    describe("DIRECT_DEBIT", () => {
        describe("Payment Method", () => {
            it("createPaymentMethod", async () => {
                try {
                    // Prerequisite: A Customer Object is created
                    const response = await xendit.PaymentMethod.createPaymentMethod({
                        data: {
                            type: PaymentMethodType.DirectDebit,
                            directDebit: {
                                channelCode: DirectDebitChannelCode.Bri,
                                channelProperties: {
                                    mobileNumber: "+62818555988",
                                    cardLastFour: "8888",
                                    cardExpiry: "06/24",
                                    email: "email@email.com",
                                },
                            },
                            reusability: PaymentMethodReusability.OneTimeUse,
                            customerId: "cust-59660fb7-dcf2-4bb9-b864-f69b081219d7"
                        }
                    })

                    testResponseData.directDebit.createdPaymentMethodId = response.id

                    console.log("createPaymentMethod DirectDebit", response)
                    expect(response).toBeDefined()
                    expect(response.type).toBe(PaymentMethodType.DirectDebit)
                    expect(response.status).toBe("REQUIRES_ACTION")
                    expect(response.reusability).toBe(PaymentMethodReusability.OneTimeUse)
                    expect(response.customerId).toBe("cust-59660fb7-dcf2-4bb9-b864-f69b081219d7")

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })

            it("authPaymentMethod", async () => {
                try {
                    const response = await xendit.PaymentMethod.authPaymentMethod({
                        data: {
                            authCode: "333000",
                        },
                        paymentMethodId: testResponseData.directDebit.createdPaymentMethodId
                    })


                    expect(response).toBeDefined()
                    expect(response.status).toBe(PaymentMethodStatus.Active)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })

            it("getPaymentMethodByID", async () => {
                try {
                    const response = await xendit.PaymentMethod.getPaymentMethodByID({
                        paymentMethodId: testResponseData.directDebit.createdPaymentMethodId,
                    })

                    expect(response).toBeDefined()
                    expect(response.id).toBe(testResponseData.directDebit.createdPaymentMethodId)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })
        })

        describe("Payment Request", () => {
            it("createPaymentRequest", async () => {
                try {
                    const response = await xendit.PaymentRequest.createPaymentRequest({
                        data: {
                            amount: 20000,
                            currency: "IDR",
                            paymentMethodId: testResponseData.directDebit.createdPaymentMethodId,
                            customerId: "cust-59660fb7-dcf2-4bb9-b864-f69b081219d7",
                            description: "This is a description.",
                            metadata: {
                                foo: "bar"
                            }
                        }
                    })

                    testResponseData.directDebit.createdPaymentRequestId = response.id

                    console.log("createPaymentRequest DirectDebit", response)
                    expect(response).toBeDefined()
                    expect(response.status).toBe(PaymentRequestStatus.RequiresAction)
                    expect(response.captureMethod).toBe(PaymentRequestCaptureMethod.Automatic)
                    expect(response.customerId).toBe("cust-59660fb7-dcf2-4bb9-b864-f69b081219d7")

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })

            it("getPaymentRequestByID", async () => {
                try {
                    const response = await xendit.PaymentRequest.getPaymentRequestByID({
                        paymentRequestId: testResponseData.directDebit.createdPaymentRequestId,
                    })

                    expect(response).toBeDefined()
                    expect(response.id).toBe(testResponseData.directDebit.createdPaymentRequestId)
                    expect(response.paymentMethod.id).toBe(testResponseData.directDebit.createdPaymentMethodId)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })
        })
    })

    describe("EWALLET", () => {
        describe("Payment Method", () => {
            it("createPaymentMethod", async () => {
                try {
                    // Prerequisite: A Customer Object is created
                    const response = await xendit.PaymentMethod.createPaymentMethod({
                        data: {
                            type: PaymentMethodType.Ewallet,
                            ewallet: {
                                channelCode: EWalletChannelCode.Ovo,
                                channelProperties: {
                                    successReturnUrl: "https://redirect.me/goodstuff",
                                    failureReturnUrl: "https://redirect.me/badstuff",
                                    cancelReturnUrl: "https://redirect.me/nostuff",
                                    mobileNumber: "+62818555988"
                                }
                            },
                            reusability: PaymentMethodReusability.OneTimeUse,
                            customerId: "cust-59660fb7-dcf2-4bb9-b864-f69b081219d7"
                        }
                    })

                    testResponseData.eWallet.createdPaymentMethodId = response.id
                    console.log("createPaymentMethod EWallet", response)

                    expect(response).toBeDefined()
                    expect(response.type).toBe(PaymentMethodType.Ewallet)
                    expect(response.status).toBe(PaymentMethodStatus.Active)
                    expect(response.reusability).toBe(PaymentMethodReusability.OneTimeUse)
                    expect(response.customerId).toBe("cust-59660fb7-dcf2-4bb9-b864-f69b081219d7")

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })

            it("getPaymentMethodByID", async () => {
                try {
                    const response = await xendit.PaymentMethod.getPaymentMethodByID({
                        paymentMethodId: testResponseData.eWallet.createdPaymentMethodId,
                    })

                    expect(response).toBeDefined()
                    expect(response.id).toBe(testResponseData.eWallet.createdPaymentMethodId)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })
        })

        describe("Payment Request", () => {
            it("createPaymentRequest", async () => {
                try {
                    const response = await xendit.PaymentRequest.createPaymentRequest({
                        data: {
                            amount: 20000,
                            currency: "IDR",
                            paymentMethodId: testResponseData.eWallet.createdPaymentMethodId,
                            customerId: "cust-59660fb7-dcf2-4bb9-b864-f69b081219d7",
                            description: "This is a description.",
                            metadata: {
                                foo: "bar"
                            }
                        }
                    })

                    testResponseData.eWallet.createdPaymentRequestId = response.id

                    console.log("Create PaymentRequest", response)
                    expect(response).toBeDefined()
                    expect(response.status).toBe(PaymentRequestStatus.Pending)
                    expect(response.captureMethod).toBe(PaymentRequestCaptureMethod.Automatic)
                    expect(response.customerId).toBe("cust-59660fb7-dcf2-4bb9-b864-f69b081219d7")

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })

            it("getPaymentRequestByID", async () => {
                try {
                    const response = await xendit.PaymentRequest.getPaymentRequestByID({
                        paymentRequestId: testResponseData.eWallet.createdPaymentRequestId,
                    })

                    expect(response).toBeDefined()
                    expect(response.id).toBe(testResponseData.eWallet.createdPaymentRequestId)
                    expect(response.paymentMethod.id).toBe(testResponseData.eWallet.createdPaymentMethodId)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })
        })
    })

    describe("QR_CODE", () => {
        describe("Payment Request with Payment Method", () => {
            it("createPaymentRequest", async () => {
                try {
                    const response = await xendit.PaymentRequest.createPaymentRequest({
                        data: {
                            amount: 20000,
                            currency: "IDR",
                            paymentMethod: {
                                type: PaymentMethodType.QrCode,
                                reusability: PaymentMethodReusability.OneTimeUse,
                                qrCode: {
                                    channelCode: QRCodeChannelCode.Dana
                                },
                                description: "sample description"
                            }
                        }
                    })

                    testResponseData.qrCode.createdPaymentRequestId = response.id
                    testResponseData.qrCode.createdPaymentMethodId = response.paymentMethod.id

                    console.log("Create PaymentRequest QR_CODE", response)
                    expect(response).toBeDefined()
                    expect(response.status).toBe(PaymentRequestStatus.Pending)
                    expect(response.captureMethod).toBe(PaymentRequestCaptureMethod.Automatic)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })

            it("getPaymentRequestByID", async () => {
                try {
                    const response = await xendit.PaymentRequest.getPaymentRequestByID({
                        paymentRequestId: testResponseData.qrCode.createdPaymentRequestId,
                    })

                    expect(response).toBeDefined()
                    expect(response.id).toBe(testResponseData.qrCode.createdPaymentRequestId)
                    expect(response.paymentMethod.id).toBe(testResponseData.qrCode.createdPaymentMethodId)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })
        })
    })

    describe("VIRTUAL_ACCOUNT", () => {
        describe("Payment Request with Payment Method", () => {
            it("createPaymentRequest", async () => {
                try {
                    const response = await xendit.PaymentRequest.createPaymentRequest({
                        data: {
                            amount: 20000,
                            currency: "IDR",
                            paymentMethod: {
                                type: PaymentMethodType.VirtualAccount,
                                reusability: PaymentMethodReusability.OneTimeUse,
                                referenceId: TestUtil.generateUniqueIdForBusiness(process.env.BUSINESS_ID),
                                virtualAccount: {
                                    channelCode: VirtualAccountChannelCode.Bri,
                                    channelProperties: {
                                        customerName: "John Doe"
                                    }
                                }
                            }
                        }
                    })

                    testResponseData.va.createdPaymentRequestId = response.id
                    testResponseData.va.createdPaymentMethodId = response.paymentMethod.id

                    console.log("Create PaymentRequest VIRTUAL_ACCOUNT", response)
                    expect(response).toBeDefined()
                    expect(response.status).toBe(PaymentRequestStatus.Pending)
                    expect(response.captureMethod).toBe(PaymentRequestCaptureMethod.Automatic)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })

            it("getPaymentRequestByID", async () => {
                try {
                    const response = await xendit.PaymentRequest.getPaymentRequestByID({
                        paymentRequestId: testResponseData.va.createdPaymentRequestId,
                    })

                    expect(response).toBeDefined()
                    expect(response.id).toBe(testResponseData.va.createdPaymentRequestId)
                    expect(response.paymentMethod.id).toBe(testResponseData.va.createdPaymentMethodId)

                } catch (error) {
                    console.log({
                        error_code: error.errorCode,
                        message: error.errorMessage,
                        status: error.status,
                    })

                    if (
                        !(process.env.IGNORED_ERRORCODE || []).includes(error.errorCode)
                    ) {
                        throw error
                    }
                }
            })
        })
    })
})
