export const validateYear = (year) => {
  const regex = /(19[0-9][0-9]|20[0-3][0-9])/;
  if (regex.test(year)) {
    return true;
  }
  return false;
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(String(password).toLowerCase());
};

export const validateEmail = (email) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

export const validatePwdConfirm = (pwd, confPwd) => {
  if (String(pwd).localeCompare(String(confPwd)) !== 0) {
    return false;
  }
  return true;
};
