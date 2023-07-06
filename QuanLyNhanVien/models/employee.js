function Employee(
  account,
  fullName,
  email,
  password,
  startDate,
  basicPay,
  position,
  workTime
) {
  this.account = account;
  this.fullName = fullName;
  this.email = email;
  this.password = password;
  this.startDate = startDate;
  this.basicPay = basicPay;
  this.position = position;
  this.workTime = workTime;
  this.salary = 0;
  this.employeeClass = '';

  this.payRoll = function () {
    if (this.position === 'Sếp') {
      this.salary = this.basicPay * 3;
    } else if (this.position === 'Trưởng phòng') {
      this.salary = this.basicPay * 2;
    } else {
      this.salary = this.basicPay * 1;
    }
  };

  this.classified = function () {
    if (this.workTime >= 192) {
      this.employeeClass = 'Nhân viên xuất sắc';
    } else if (this.workTime >= 176) {
      this.employeeClass = 'Nhân viên giỏi';
    } else if (this.workTime >= 160) {
      this.employeeClass = 'Nhân viên khá';
    } else {
      this.employeeClass = 'Nhân viên trung bình';
    }
  };
}
