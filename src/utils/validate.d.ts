export function requiredFields(
  fieldsArr: Array<string>,
): {
  validate: (data: object) => Array<string>;
};

export function missingFieldsToStr(missingFields: Array<string>): string;

export function missingFieldsErrMsg(missingFields: Array<string>): string;

export function rejectOnMissingFields(
  compulsoryFields: Array<string>,
  data: object,
  rejectFn: function,
): void;
