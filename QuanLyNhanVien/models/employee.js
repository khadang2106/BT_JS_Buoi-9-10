const BOSS_SALARY_RATE = 3;
const MANAGER_SALARY_RATE = 2;
const EMPLOYEEE_SALARY_RATE = 1;

const EXCELLENT_WORK_TIME = 192;
const VERYGOOD_WORK_TIME = 176;
const GOOD_WORK_TIME = 160;

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
      this.salary = this.basicPay * BOSS_SALARY_RATE;
    } else if (this.position === 'Trưởng phòng') {
      this.salary = this.basicPay * MANAGER_SALARY_RATE;
    } else {
      this.salary = this.basicPay * EMPLOYEEE_SALARY_RATE;
    }
  };

  this.classified = function () {
    if (this.workTime >= EXCELLENT_WORK_TIME) {
      this.employeeClass = 'Nhân viên xuất sắc';
    } else if (this.workTime >= VERYGOOD_WORK_TIME) {
      this.employeeClass = 'Nhân viên giỏi';
    } else if (this.workTime >= GOOD_WORK_TIME) {
      this.employeeClass = 'Nhân viên khá';
    } else {
      this.employeeClass = 'Nhân viên trung bình';
    }
  };
}
