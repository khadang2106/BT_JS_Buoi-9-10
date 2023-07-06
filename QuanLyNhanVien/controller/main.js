var employeeList = new EmployeeList();
var numberFormat = new Intl.NumberFormat('VN-vn');

getLocalStorage();

function renderTable(data) {
  var content = '';
  for (var i = 0; i < data.length; i++) {
    content += `
        <tr>
        <td>${data[i].account}</td>
        <td>${data[i].fullName}</td>
        <td>${data[i].email}</td>
        <td>${data[i].startDate}</td>
        <td>${data[i].position}</td>
        <td>${numberFormat.format(data[i].salary)}</td>
        <td>${data[i].employeeClass}</td>
        <td>
            <div class="d-flex">
                <button class="btn btn-danger" onclick="delData('${
                  data[i].account
                }')">Xóa</button>
                <button class="btn btn-warning" onclick="updateData('${
                  data[i].account
                }')" data-toggle="modal" data-target="#myModal">Sửa</button>
            </div>
        </td>
        </tr>
        `;
  }
  getEle('tableDanhSach').innerHTML = content;
}

function getEmployeeInfo() {
  var account = getEle('tknv').value;
  var fullName = getEle('name').value;
  var email = getEle('email').value;
  var password = getEle('password').value;
  var startDate = getEle('datepicker').value;
  var basicPay = getEle('luongCB').value;
  var position = getEle('chucvu').value;
  var workTime = getEle('gioLam').value;

  var employee = new Employee(
    account,
    fullName,
    email,
    password,
    startDate,
    basicPay,
    position,
    workTime
  );
  employee.payRoll();
  employee.classified();

  return employee;
}

getEle('btnThemNV').onclick = function () {
  var employee = getEmployeeInfo();
  if (employee) {
    employeeList.addEmployee(employee);
    renderTable(employeeList.list);
    setLocalStorage();
  }
};

function delData(account) {
  employeeList.delEmployee(account);
  renderTable(employeeList.list);
  setLocalStorage();
}

function updateData(account) {
  var employee = employeeList.getEmployeeData(account);
  if (employee) {
    getEle('tknv').value = employee.account;
    getEle('tknv').disabled = true;
    getEle('name').value = employee.fullName;
    getEle('email').value = employee.email;
    getEle('password').value = employee.password;
    getEle('datepicker').value = employee.startDate;
    getEle('luongCB').value = employee.basicPay;
    getEle('chucvu').value = employee.position;
    getEle('gioLam').value = employee.workTime;
  }
}

getEle('btnCapNhat').onclick = function () {
  var employee = getEmployeeInfo();
  employeeList.updateEmployee(employee);
  renderTable(employeeList.list);
  setLocalStorage();
};

function setLocalStorage() {
  localStorage.setItem('employeeList', JSON.stringify(employeeList.list));
}
function getLocalStorage() {
  if (localStorage.getItem('employeeList')) {
    var listString = localStorage.getItem('employeeList');
    employeeList.list = JSON.parse(listString);
    renderTable(employeeList.list);
  }
}
