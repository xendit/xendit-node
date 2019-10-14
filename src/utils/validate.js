const errors = require('../errors');

const Validate = {
  requiredFields(fieldsArr) {
    this.validate = function(data) {
      const missing = [];
      fieldsArr.forEach(function(f) {
        if (!data || !data.hasOwnProperty(f)) {
          missing.push(f);
        }
      });
      return missing;
    };

    return this;
  },

  missingFieldsErrMsg(missingFields) {
    let message = 'Missing required fields: ';
    missingFields.forEach((f, i) =>
      i < missingFields.length - 1
        ? (message += `'${f}', `)
        : (message += `'${f}'`),
    );

    return message;
  },

  rejectOnMissingFields(compulsoryFields, data, rejectFn) {
    const missingFields = Validate.requiredFields(compulsoryFields).validate(
      data,
    );
    if (missingFields.length > 0) {
      let message = Validate.missingFieldsErrMsg(missingFields);
      rejectFn({ status: 400, code: errors.API_VALIDATION_ERROR, message });
    }
  },
};

module.exports = Validate;
