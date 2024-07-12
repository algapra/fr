declare module 'midtrans-client' {
  interface MidtransClientOptions {
    isProduction: boolean
    serverKey: string
    clientKey: string
  }

  interface MidtransPaymentResponse {
    token: string
    redirect_url: string
  }

  /**
   *  Config Object that used to store isProduction, serverKey, clientKey.
   *  And also API base urls.
   */
  class ApiConfig{

    /**
     * Initiate with options
     * @param  {Object} options - should have these props:
     * isProduction, serverKey, clientKey
     */
    constructor(options: MidtransClientOptions)
    /**
     * Return config stored
     * @return {Object} object contains isProduction, serverKey, clientKey
     */
    get(): MidtransClientOptions
    set(options: MidtransClientOptions): void
    getCoreApiBaseUrl(): string

    /**
     * @return {String} snap api base url
     */
    getSnapApiBaseUrl(): String
    /**
     * @return {String} Iris api base url
     */
    getIrisApiBaseUrl(): String
  }
  /**
 * CoreApi object able to do API request to Midtrans Core API
 */
  class CoreApi{
    /**
     * Initiate with options
     * @param  {Object} options - should have these props:
     * isProduction, serverKey, clientKey
     */
    constructor(options: MidtransClientOptions)
    /**
     * Do `/charge` API request to Core API
     * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    charge(parameter: object): Promise<any>
    /**
     * Do `/capture` API request to Core API
     * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    capture(parameter: object): Promise<any>
    /**
     * Do `/card/register` API request to Core API
     * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    cardRegister(parameter: object): Promise<any>
    /**
     * Do `/token` API request to Core API
     * @param  {Object} parameter - object of Core API JSON body as parameter, will be converted to JSON (more params detail refer to: https://api-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    cardToken(parameter: object): Promise<any>
    /**
     * Do `/point_inquiry/<tokenId>` API request to Core API
     * @param  {String} tokenId - tokenId of credit card (more params detail refer to: https://api-docs.midtrans.com)
     * @return {Promise} - Promise contains Object from JSON decoded response
     */
    cardPointInquiry(tokenId: string): Promise<any>
  }
  class MidtransError extends Error{
    httpStatusCode: number
    ApiResponse: object
    rawHttpClientData: string
    constructor(message: string,httpStatusCode?: number, ApiResponse?: object, rawHttpClientData?: string)
  }

  class Snap {
    apiConfig: ApiConfig
    transaction: Transaction
    constructor(options: MidtransClientOptions)
  
    createTransaction(parameter: object): Promise<MidtransPaymentResponse>
    /**
     * Wrapper function that call `createTransaction` then:
     * @return {Promise} - Promise of String token
     */
    createTransactionToken(parameter: object): Promise<any>
    /**
     * Wrapper function that call `createTransaction` then:
     * @return {Promise} - Promise of String redirect_url
     */
    createTransactionRedirectUrl(parameter: object): Promise<any>
  }
  class Transaction{
    constructor(parentObj: any)
    status(transactionId: string): Promise<any>
    statusb2b(transactionId: string): Promise<any>
    approve(transactionId: string): Promise<any>
    deny(transactionId: string): Promise<any>
    cancel(transactionId: string): Promise<any>
    expire(transactionId: string): Promise<any>
    refund(transactionId: string): Promise<any>
    refundDirect(transactionId: string, parameter: object): Promise<any>
    notification(notificationObj: object): Promise<any>
  }
}
