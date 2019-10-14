const CYBCardTypes = {
  VISA: '001',
  MASTERCARD: '002',
  AMEX: '003',
  DISCOVER: '004',
  JCB: '007',
  VISA_ELECTRON: '033',
  DANKORT: '034',
};
const NUM_REGEX = /^\d+$/;

function isCreditCardNumberValid(creditCardNumber) {
  return (
    NUM_REGEX.test(creditCardNumber) &&
    creditCardNumber.length >= 12 &&
    creditCardNumber.length <= 19 &&
    getCardType(creditCardNumber) !== null &&
    isValidLuhnNumber(creditCardNumber)
  );
}

function isCreditCardExpirationDateValid(
  cardExpirationMonth,
  cardExpirationYear,
) {
  return (
    NUM_REGEX.test(cardExpirationMonth) &&
    NUM_REGEX.test(cardExpirationYear) &&
    Number(cardExpirationMonth) >= 1 &&
    Number(cardExpirationMonth) <= 12 &&
    Number(cardExpirationYear) >= 2016 &&
    Number(cardExpirationYear) <= 2100
  );
}

function isCreditCardCVNValid(creditCardCVN) {
  if (creditCardCVN) {
    return (
      NUM_REGEX.test(creditCardCVN) &&
      Number(creditCardCVN) >= 0 &&
      String(creditCardCVN).length <= 4
    );
  }
  return true;
}

function isCreditCardCVNValidForCardType(creditCardCVN, cardNumber) {
  if (creditCardCVN) {
    if (NUM_REGEX.test(creditCardCVN) && Number(creditCardCVN)) {
      return _isCardAmex(cardNumber)
        ? String(creditCardCVN).length === 4
        : String(creditCardCVN).length === 3;
    }

    return false;
  }
  return true;
}

function isValidLuhnNumber(cardNumber) {
  var sum = 0,
    bEven = false;
  cardNumber = cardNumber.replace(/\D/g, '');

  for (var n = cardNumber.length - 1; n >= 0; n--) {
    var cDigit = cardNumber.charAt(n);
    var nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) {
        nDigit -= 9;
      }
    }

    sum += nDigit;
    bEven = !bEven;
  }

  return sum % 10 === 0;
}

function getCardType(cardNumber) {
  if (cardNumber.indexOf('4') === 0) {
    if (_isCardVisaElectron(cardNumber)) {
      return CYBCardTypes.VISA_ELECTRON;
    } else {
      return CYBCardTypes.VISA;
    }
  } else if (_isCardAmex(cardNumber)) {
    return CYBCardTypes.AMEX;
  } else if (_isCardMastercard(cardNumber)) {
    return CYBCardTypes.MASTERCARD;
  } else if (_isCardDiscover(cardNumber)) {
    return CYBCardTypes.DISCOVER;
  } else if (_isCardJCB(cardNumber)) {
    return CYBCardTypes.JCB;
  } else if (_isCardDankort(cardNumber)) {
    return CYBCardTypes.DANKORT;
  } else {
    return null;
  }
}

function _isCardAmex(cardNumber) {
  return cardNumber.indexOf('34') === 0 || cardNumber.indexOf('37') === 0;
}

function _isCardDiscover(cardNumber) {
  var firstStartingNumber = Number(cardNumber.substring(0, 3));
  var secondStartingNumber = Number(cardNumber.substring(0, 6));

  return (
    (firstStartingNumber >= 644 && firstStartingNumber <= 649) ||
    (secondStartingNumber >= 622126 && secondStartingNumber <= 622925) ||
    cardNumber.indexOf('65') === 0 ||
    cardNumber.indexOf('6011') === 0
  );
}

function _isCardJCB(cardNumber) {
  var startingNumber = cardNumber.substring(0, 4);
  return startingNumber >= 3528 && startingNumber <= 3589;
}

function _isCardMaestro(cardNumber) {
  return (
    cardNumber.indexOf('5018') === 0 ||
    cardNumber.indexOf('5020') === 0 ||
    cardNumber.indexOf('5038') === 0 ||
    cardNumber.indexOf('5612') === 0 ||
    cardNumber.indexOf('5893') === 0 ||
    cardNumber.indexOf('6304') === 0 ||
    cardNumber.indexOf('6759') === 0 ||
    cardNumber.indexOf('6761') === 0 ||
    cardNumber.indexOf('6762') === 0 ||
    cardNumber.indexOf('6763') === 0 ||
    cardNumber.indexOf('0604') === 0 ||
    cardNumber.indexOf('6390') === 0
  );
}

function _isCardVisaElectron(cardNumber) {
  return (
    cardNumber.indexOf('4026') === 0 ||
    cardNumber.indexOf('417500') === 0 ||
    cardNumber.indexOf('4405') === 0 ||
    cardNumber.indexOf('4508') === 0 ||
    cardNumber.indexOf('4844') === 0 ||
    cardNumber.indexOf('4913') === 0 ||
    cardNumber.indexOf('4917') === 0
  );
}

module.exports = {
  isCreditCardNumberValid,
  isCreditCardExpirationDateValid,
  isCreditCardCVNValid,
  isCreditCardCVNValidForCardType,
  isValidLuhnNumber,
  getCardType,
  _isCardAmex,
  _isCardDiscover,
  _isCardJCB,
  _isCardMaestro,
  _isCardVisaElectron,
};
