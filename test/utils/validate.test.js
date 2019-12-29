const chai = require('chai');
const { expect } = chai;

const { Validate } = require('../../src/utils');
const { Errors } = require('../../src/xendit');

describe('Validate utils', () => {
  it('should reject with the right errors', () => {
    const testCases = [
      { fields: ['id'], data: {}, message: `Missing required fields: 'id'` },
      {
        fields: ['id', 'foo', 'bar'],
        data: {},
        message: `Missing required fields: 'id', 'foo', 'bar'`,
      },
      {
        fields: ['id', 'foo', 'bar'],
        data: { id: 1 },
        message: `Missing required fields: 'foo', 'bar'`,
      },
    ];
    testCases.forEach(tc =>
      Validate.rejectOnMissingFields(tc.fields, tc.data, e => {
        expect(e).to.deep.equal({
          status: 400,
          code: Errors.API_VALIDATION_ERROR,
          message: tc.message,
        });
      }),
    );
  });
});
