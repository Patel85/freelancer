export const validatePassword = (password) => {
  let errors = [];

  if (!password) {
    errors.push("Password is Required");
  }

  var atleastEightCharacter = /.{8,}/;
  if (!atleastEightCharacter.test(password)) {
    errors.push("Password must have length of Eight Charactors.");
  }

  var atleastOneUpperAlphabet = /(?=.*?[A-Z])/;
  if (!atleastOneUpperAlphabet.test(password)) {
    errors.push("Password must have atleast one upper case.");
  }

  var atleastOneDigit = /(?=.*?[0-9])/;
  if (!atleastOneDigit.test(password)) {
    errors.push("Password must cantains at least one digit.");
  }

  var atleastOneSpecialCharacter = /(?=.*?[#?!@$%^&*-])/;
  if (!atleastOneSpecialCharacter.test(password)) {
    errors.push("Password must have atleast one Special Charactor.");
  }

  return errors;
};

export const validateEmail = (email) => {
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(mailformat);
};

export const fieldHasError = (field) => {
  if (Array.isArray(field) && field.length > 0) {
    return true;
  }

  if ((typeof field === "string" || field instanceof String) && !!field) {
    return true;
  }

  return false;
};
