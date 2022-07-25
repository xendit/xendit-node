const { Validate, Auth, fetchWithHTTPErr, promWithJsErr } = require('../utils');

function createPromotion(data) {
  return promWithJsErr((resolve, reject) => {
    const compulsoryFields = [
      'referenceId',
      'description',
      'currency',
      'startTime',
      'endTime',
    ];
    Validate.rejectOnMissingFields(compulsoryFields, data, reject);

    let headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    fetchWithHTTPErr(`${this.API_ENDPOINT}/promotions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        reference_id: data.referenceId,
        description: data.description,
        promo_code: data.promoCode,
        bin_list: data.binList,
        channel_code: data.channelCode,
        discount_percent: data.discountPercent,
        discount_amount: data.discountAmount,
        currency: data.currency,
        start_time: data.startTime,
        end_time: data.endTime,
        min_original_amount: data.minOriginalAmount,
        max_discount_amount: data.maxDiscountAmount,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
}

module.exports = {
  createPromotion,
};
