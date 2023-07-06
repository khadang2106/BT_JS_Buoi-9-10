function EmployeeList() {
  this.list = [];

  this.addEmployee = function (employee) {
    this.list.push(employee);
  };

  this.findIndex = function (account) {
    for (var i = 0; i < this.list.length; i++) {
      if (this.list[i].account === account) {
        return i;
      }
    }
    return -1;
  };

  this.delEmployee = function (account) {
    if (this.findIndex(account) !== -1) {
      this.list.splice(this.findIndex(account), 1);
    }
  };

  this.getEmployeeData = function (account) {
    if (this.findIndex(account) !== -1) {
      return this.list[this.findIndex(account)];
    }
  };

  this.updateEmployee = function (employee) {
    if (this.findIndex(employee.account) !== -1) {
      this.list[this.findIndex(employee.account)] = employee;
    }
  };
}
