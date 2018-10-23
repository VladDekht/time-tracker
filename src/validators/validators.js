export const validateYear = year => {
    var regex = /(19[0-9][0-9]|20[0-3][0-9])/;
    if (regex.test(year)) {
      return true;
    }
    return false;
  };