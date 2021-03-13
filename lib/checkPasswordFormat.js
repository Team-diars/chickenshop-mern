const checkPasswordFormat = (value) => {
  if (!value) {
    return false;
  }
  if (/[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value)) {
    return true;
  }
  return false;
};

module.exports = {
  checkPasswordFormat,
};
