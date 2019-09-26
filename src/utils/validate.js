module.exports = {
  requiredFields(fieldsArr) {
    this.validate = function(data) {
      const missing = [];
      fieldsArr.forEach(function(f) {
        if (!data || !data[f]) {
          missing.push(f);
        }
      });
      return missing;
    };

    return this;
  },
};
