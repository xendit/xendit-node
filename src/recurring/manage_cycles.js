const querystring = require('querystring');
const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

function getCycle(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['id', 'businessId', 'planId'],
      data,
      reject,
    );
    fetchWithHTTPErr(
      `${this.API_ENDPOINT_PLANS}/${data.planId}/cycles/${data.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
          'business-id': data.businessId,
        },
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

function getAllCycles(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['businessId', 'planId'], data, reject);
    const query = {};
    if (data.limit) {
      query.limit = data.limit;
    }
    if (data.beforeId) {
      query.before_id = data.beforeId;
    }
    if (data.afterId) {
      query.after_id = data.afterId;
    }
    if (data.searchType) {
      query.search_type = data.searchType;
    }
    if (data.searchValue) {
      query.search_value = data.searchValue;
    }

    const urlSearchParams = querystring.stringify(query);

    fetchWithHTTPErr(
      `${this.API_ENDPOINT_PLANS}/${
        data.planId
      }/cycles?${urlSearchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
          'business-id': data.businessId,
        },
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

function cancelCycle(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['id', 'businessId', 'planId'],
      data,
      reject,
    );
    fetchWithHTTPErr(
      `${this.API_ENDPOINT_PLANS}/${data.planId}/cycles/${data.id}/cancel`,
      {
        method: 'POST',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
          'business-id': data.businessId,
        },
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

function editCycle(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['id', 'businessId', 'planId'],
      data,
      reject,
    );
    fetchWithHTTPErr(
      `${this.API_ENDPOINT_PLANS}/${data.planId}/cycles/${data.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: Auth.basicAuthHeader(this.opts.secretKey),
          'Content-Type': 'application/json',
          'business-id': data.businessId,
        },
        body: JSON.stringify({
          scheduled_timestamp: data.scheduledTimestamp,
          currency: data.currency,
          amount: data.amount,
          metadata: data.metadata,
        }),
      },
    )
      .then(resolve)
      .catch(reject);
  });
}

module.exports = { getCycle, getAllCycles, cancelCycle, editCycle };
