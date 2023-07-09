var employeeList = new EmployeeList();
var valid = new Validation();
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

function getEmployeeInfo(bool) {
  var account = getEle('tknv').value;
  var fullName = getEle('name').value;
  var email = getEle('email').value;
  var password = getEle('password').value;
  var startDate = getEle('datepicker').value;
  var basicPay = getEle('luongCB').value;
  var position = getEle('chucvu').value;
  var workTime = getEle('gioLam').value;

  /**
   * Validation
   */
  var isValid = true;
  //Account
  if (bool) {
    isValid &=
      valid.checkEmpty(account, 'tbTKNV', '(*) Vui lòng không để trống!') &&
      valid.checkLength(
        account,
        'tbTKNV',
        '(*) Tài khoản phải chứa từ 4-6 ký tự!',
        4,
        6
      ) &&
      valid.checkExist(account, 'tbTKNV', '(*) Tài khoản đã tồn tại!');
  }
  //Full Name
  isValid &=
    valid.checkEmpty(fullName, 'tbTen', '(*) Vui lòng không để trống!') &&
    valid.checkPattern(
      fullName,
      '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
        'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
        'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$',
      'tbTen',
      '(*) Vui lòng nhập Họ tên hợp lệ!'
    );
  //Email
  isValid &=
    valid.checkEmpty(email, 'tbEmail', '(*) Vui lòng không để trống!') &&
    valid.checkPattern(
      email,
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'tbEmail',
      '(*) Vui lòng nhập Email hợp lệ!'
    );
  //Password
  isValid &=
    valid.checkEmpty(password, 'tbMatKhau', '(*) Vui lòng không để trống!') &&
    valid.checkPattern(
      password,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
      'tbMatKhau',
      '(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt'
    ) &&
    valid.checkLength(
      password,
      'tbMatKhau',
      'Mật khẩu phải chứa từ 6-10 ký tự!',
      6,
      10
    );
  //Date
  isValid &=
    valid.checkEmpty(startDate, 'tbNgay', '(*) Vui lòng không để trống!') &&
    valid.checkPattern(
      startDate,
      /^(0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/]\d{4}$/,
      'tbNgay',
      '(*) Ngày làm phải theo định dạng mm/dd/yyyy!'
    );
  //Basic Pay
  isValid &=
    valid.checkEmpty(basicPay, 'tbLuongCB', '(*) Vui lòng không để trống!') &&
    valid.checkPattern(
      basicPay,
      /^[0-9]+$/,
      'tbLuongCB',
      '(*) Vui lòng nhập số Lương cơ bản đúng định dạng!'
    ) &&
    valid.checkLimit(
      basicPay,
      'tbLuongCB',
      '(*) Mức lương cơ bản từ 1,000,000 - 20,000,000',
      1e6,
      20e6
    );
  //Position
  isValid &= valid.checkSelection(
    'chucvu',
    'tbChucVu',
    '(*) Vui lòng chọn chức vụ!'
  );
  //Work Time
  isValid &=
    valid.checkEmpty(workTime, 'tbGiolam', '(*) Vui lòng không để trống!') &&
    valid.checkPattern(
      workTime,
      /^(\d{0,}(\.\d{0,})?)$/,
      'tbGiolam',
      '(*) Vui lòng nhập số Giờ làm đúng định dạng!'
    ) &&
    valid.checkLimit(
      workTime,
      'tbGiolam',
      '(*) Số giờ làm trong tháng từ 80 - 200 giờ',
      80,
      200
    );

  if (isValid) {
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
  return null;
}

getEle('btnThem').onclick = function () {
  getEle('btnThemNV').disabled = false;
  getEle('tknv').disabled = false;
  hideError('tbTKNV');
  hideError('tbTen');
  hideError('tbEmail');
  hideError('tbMatKhau');
  hideError('tbNgay');
  hideError('tbLuongCB');
  hideError('tbChucVu');
  hideError('tbGiolam');
};

getEle('btnThemNV').onclick = function () {
  var employee = getEmployeeInfo(true);
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
  getEle('btnThemNV').disabled = true;
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
  var employee = getEmployeeInfo(false);
  if (employee) {
    employeeList.updateEmployee(employee);
    renderTable(employeeList.list);
    setLocalStorage();
  }
};

function searchClass() {
  var txt = getEle('searchName').value;
  var arrSearch = employeeList.searchEmployee(txt);
  renderTable(arrSearch);
}
getEle('searchName').addEventListener('keyup', searchClass);

//Hàm lấy và set data
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
