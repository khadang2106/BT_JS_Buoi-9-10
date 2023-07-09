function Validation() {
  this.checkEmpty = function (value, errorID, mess) {
    if (value.trim() === '') {
      showError(errorID, mess);
      return false;
    }
    hideError(errorID);
    return true;
  };

  this.checkSelection = function (slcID, errorID, mess) {
    if (getEle(slcID).selectedIndex !== 0) {
      hideError(errorID);
      return true;
    }
    showError(errorID, mess);
    return false;
  };

  this.checkPattern = function (value, pattern, errorID, mess) {
    if (value.match(pattern)) {
      hideError(errorID);
      return true;
    }
    showError(errorID, mess);
    return false;
  };

  this.checkLength = function (value, errorID, mess, min, max) {
    if (min <= value.trim().length && value.trim().length <= max) {
      hideError(errorID);
      return true;
    }
    showError(errorID, mess);
    return false;
  };

  this.checkLimit = function (value, errorID, mess, min, max) {
    if (min <= value && value <= max) {
      hideError(errorID);
      return true;
    }
    showError(errorID, mess);
    return false;
  };

  this.checkExistAccount = function (value, errorID, mess) {
    var isExist = false;
    for (var i = 0; i < employeeList.list.length; i++) {
      if (value === employeeList.list[i].account) {
        isExist = true;
        break;
      }
    }
    if (isExist) {
      showError(errorID, mess);
      return false;
    }
    hideError(errorID);
    return true;
  };

  this.checkExistEmail = function (value, errorID, mess) {
    var isExist = false;
    for (var i = 0; i < employeeList.list.length; i++) {
      if (value === employeeList.list[i].email) {
        isExist = true;
        break;
      }
    }
    if (isExist) {
      showError(errorID, mess);
      return false;
    }
    hideError(errorID);
    return true;
  };
}
