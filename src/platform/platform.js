const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('../utils');

function Platform(options) {
  let aggOpts = options;
  if (
    Platform._injectedOpts &&
    Object.keys(Platform._injectedOpts).length > 0
  ) {
    aggOpts = Object.assign({}, options, Platform._injectedOpts);
  }

  this.opts = aggOpts;
  this.API_ENDPOINT = this.opts.xenditURL;
}

Platform._injectedOpts = {};
Platform._constructorWithInjectedXenditOpts = function(options) {
  Platform._injectedOpts = options;
  return Platform;
};
Platform.AccountType = {
  Owned: 'OWNED',
  Managed: 'MANAGED',
};

Platform.prototype.createAccount = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['accountEmail', 'type'], data, reject);

    const body = {
      account_email: data.accountEmail,
      type: data.type,
    };
    if (data.businessProfile) {
      body.business_profile = {
        business_name: data.businessProfile.businessName,
      };
    }
    fetchWithHTTPErr(`${this.API_ENDPOINT}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
      body: JSON.stringify(body),
    })
      .then(resolve)
      .catch(reject);
  });
};

Platform.prototype.setCallbackURL = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['type', 'url'], data, reject);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: Auth.basicAuthHeader(this.opts.secretKey),
    };
    if (data.forUserID) {
      headers['for-user-id'] = data.forUserID;
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/callback_urls/${data.type}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        url: data.url,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

Platform.prototype.createTransfer = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(
      ['reference', 'amount', 'sourceUserID', 'destinationUserID'],
      data,
      reject,
    );

    fetchWithHTTPErr(`${this.API_ENDPOINT}/transfers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
      body: JSON.stringify({
        reference: data.reference,
        amount: data.amount,
        source_user_id: data.sourceUserID,
        destination_user_id: data.destinationUserID,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

Platform.prototype.createFeeRule = function(data) {
  return promWithJsErr((resolve, reject) => {
    Validate.rejectOnMissingFields(['name', 'routes'], data, reject);

    // transform from routes function input type to HTTP JSON body
    let routes = [];
    if (data.routes && data.routes.length > 0) {
      routes = data.routes.map(r => ({
        unit: r.unit,
        amount: r.amount,
        currency: r.currency,
      }));
    }

    fetchWithHTTPErr(`${this.API_ENDPOINT}/fee_rules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Auth.basicAuthHeader(this.opts.secretKey),
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        routes,
      }),
    })
      .then(resolve)
      .catch(reject);
  });
};

module.exports = Platform;
