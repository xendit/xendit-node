const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

const REPORT_PATH = '/reports';

function Report(options) {
  let aggOpts = options;
  if (Report._injectedOpts && Object.keys(Report._injectedOpts).length > 0) {
    aggOpts = Object.assign({}, options, Report._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL + REPORT_PATH;
}

Report._injectedOpts = {};
Report._constructorWithInjectedXenditOpts = function(options) {
  Report._injectedOpts = options;
  return Report;
};

Report.prototype.generateReport = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['type'], data, reject);

    const filterOpts = {};
    // eslint-disable-next-line
    if (data.filterDateFrom) {
      filterOpts.from = data.filterDateFrom.toISOString();
    }
    if (data.filterDateTo) filterOpts.to = data.filterDateTo.toISOString();

    const headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.forUserId) {
      headers['for-user-id'] = data.forUserId;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: data.type,
        filter: filterOpts,
        format: data.format ? data.format : 'CSV',
        currency: data.currency ? data.currency : 'IDR',
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

Report.prototype.getReport = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['id'], data, reject);

    const headers = {
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      'Content-Type': 'application/json',
    };

    if (data && data.forUserId) {
      headers['for-user-id'] = data.forUserId;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/${data.id}`, {
      method: 'GET',
      headers: {
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
        'Content-Type': 'application/json',
      },
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports = Report;
