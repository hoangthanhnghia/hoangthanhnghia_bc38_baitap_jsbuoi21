var staffList = [];

function createStaff() {
    if (!validateForm()) return;

    

    // 1. Dom lấy thông tin từ ô input
    var id = document.getElementById('tknv').value;
    var fullName = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var passWord = document.getElementById('password').value;
    var datepicker = document.getElementById('datepicker').value;
    var basicSalary = +document.getElementById('luongCB').value;
    var position = document.getElementById('chucvu').value;
    var timeWorking = +document.getElementById('gioLam').value;

    // 2. check trùng id
    for (var i = 0; i < staffList.length; i++) {
        if (staffList[i].staffId === id) {
            alert('Id đã tồn tại');
        return;
        }
    }

    // 3. tạo đối tượng nhân viên
    var staff = new Staff(id, fullName, email, passWord, datepicker, basicSalary, position, timeWorking);

    // 4. thêm đối tượng nhân viên vào danh sách
    staffList.push(staff);

    // console.log(staffList);

    // hiện danh sách sinh viên ra màn hình
    renderStaffs();

    saveStaffList();
}

function renderStaffs() {
    var html = '';
    for(var i = 0; i < staffList.length; i++){
        html += `<tr>
                    <td>${staffList[i].staffId}</td>
                    <td>${staffList[i].fullName}</td>
                    <td>${staffList[i].email}</td>
                    <td>${staffList[i].datepicker}</td>
                    <td>${staffList[i].position}</td>                  
                                     
                    <td>${staffList[i].fullSalary()}</td>
                    <td>${staffList[i].classification()}</td>             
                    <td>${staffList[i].timeWorking}</td>
                    <td>
                  <button 
                     onclick="deleteStaff('${staffList[i].staffId}')"
                    class="btn btn-danger">Xoá</button>
                </tr>`
    };
    document.getElementById('tableDanhSach').innerHTML = html;
};

function saveStaffList() {
    // chuyển staffList thành chuỗi JSON
    var staffListJson = JSON.stringify(staffList);
    localStorage.setItem('SL', staffListJson);
}

function getStaffList() {
    var staffListJson = localStorage.getItem('SL');
    //
    if (!staffListJson) return [];
    //
    
    return JSON.parse(staffListJson);
}

function deleteStaff(id) {
    var index = findById(id);
    if( index === -1) {
        return alert('Id không tồn tại');
    }
    staffList.splice(index, 1);

    renderStaffs();

    saveStaffList();
}

// input: id => output : index
function findById(id) {
    for( var i = 0; i < staffList.length; i++){
        if(staffList[i].staffId === id) {
            return i;
        }
    }

    return -1;
}

window.onload = function() {
    //
    var staffListFromLocal = getStaffList();
    staffList = mapStaffList(staffListFromLocal);
    console.log(staffList);
    renderStaffs();
};

// input: dataLocal => output : data mới
function mapStaffList(local) {
    var result = [];

    for (var i = 0; i < local.length; i++) {
        var oldStaff = local[i];
        var newStaff = new Staff(
            oldStaff.staffId,
            oldStaff.fullName,
            oldStaff.email,
            oldStaff.passWord,
            oldStaff.datepicker,
            oldStaff.basicSalary,
            oldStaff.position,
            oldStaff.timeWorking,
        );
        result.push(newStaff);
    }

    return result;
}

// -----------validation----------

// required
/**
 * // val : string
// config :{
    ErrorId : string
    min : number
    max : number
    regexp : object
}
 */
function required(val, config) {
    if(val.length > 0){
        document.getElementById(config.errorId).innerHTML = '';
        return true;
    }

    document.getElementById(config.errorId).innerHTML = '*vui lòng nhập giá trị';
    return false;
}


// min-length & max-length
function length(val, config) {
    if(val.length < config.min || val.length > config.max){
        document.getElementById(config.errorId).innerHTML = `*Độ dài phải từ ${config.min} đến ${config.max} kí tự`;
        return false;
    }

    document.getElementById(config.errorId).innerHTML = '';
    return true;

}

//pattern - regular expression
function pattern(val, config) {
    if( config.regexp.test(val) ) {
        document.getElementById(config.errorId).innerHTML = '';
        return true;
    }

    document.getElementById(config.errorId).innerHTML = '*Giá trị không đúng định dạng';
    return false;
    
}

// function patternEmail(val, config) {
//     if( config.regexp.test(val) ) {
//         document.getElementById(config.errorId).innerHTML = '';
//     }
// }


function validateForm() {
    var staffId = document.getElementById('tknv').value;
    var fullName = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var passWord = document.getElementById('password').value;
    var datepicker = document.getElementById('datepicker').value;
    var basicSalary = document.getElementById('luongCB').value;
    var timeWorking = document.getElementById('gioLam').value;

    var textRegexp = /^[A-z\s]+$/g;
    var emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    var passWordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/g;
    var datepickerRegexp = /^(?:(?:(?:0?[13578]|1[02])([/.-])(?:0?[1-9]|[12]\d|3[01])\1|0?2([/.-])(?:0?[1-9]|1\d|2[0-8])\2|(?:0?[469]|11)([/.-])(?:0?[1-9]|[12]\d|30)\3|(?:0?[1-9]|[1-2]\d|3[0-1])([/.-])(?:0?[13578]|1[02])\4|(?:0?[1-9]|1\d|2[0-8])([/.-])0?2\5|(?:0?[1-9]|[12]\d|30)([/.-])(?:0?[469]|11)\6)(?:(?:19)?\d{2}|2\d{3})|(?:0?2([/.-])29\7|29([/.-])0?2\8)(?:19(?:0[48]|1[26]|2[048]|3[26]|4[048]|5[26]|6[048]|7[26]|8[048]|9[26])|2(?:[048](?:0[048]|1[26]|2[048]|3[26]|4[048]|5[26]|6[048]|7[26]|8[048]|9[26])|[1235679](?:0[48]|1[26]|2[048]|3[26]|4[048]|5[26]|6[048]|7[26]|8[048]|9[26]))))$/g;
    var basicSalaryRegexp = /^[0-9]{1,8}$/g;
    var timeWorkingRegexp = /^[0-9]{2,3}$/g;

    // nối 2 hàm kiểm tra của ô staffId
    var staffIdValid = required(staffId, { errorId: 'staffIdError' }) &&
    length(staffId, {errorId: 'staffIdError', min: 4, max: 6});
    
    var nameValid = required(fullName, { errorId: 'nameError' }) && pattern(fullName, { errorId: 'nameError', regexp: textRegexp });

    var emailValid = required(email, { errorId: 'emailError' }) && pattern(email, { errorId: 'emailError', regexp: emailRegexp });

    var passWordValid = required(passWord, { errorId: 'passWordError' }) && pattern(passWord, { errorId: 'passWordError', regexp: passWordRegexp });

    var datepickerValid = required(datepicker, { errorId: 'datepickerError' }) 
    && pattern(datepicker, { errorId: 'datepickerError', regexp: datepickerRegexp });

    var basicSalaryValid = required(basicSalary, { errorId: 'basicSalaryError' }) && pattern(basicSalary, { errorId: 'basicSalaryError', regexp: basicSalaryRegexp });
    // &&
    // length(basicSalary, {errorId: 'basicSalaryError', min: 4, max: 6});
    
    var timeWorkingValid = required(timeWorking, { errorId: 'timeWorkingError' }) && pattern(timeWorking, { errorId: 'timeWorkingError', regexp: timeWorkingRegexp });
    

    var isFormValid = staffIdValid && nameValid && emailValid && passWordValid && datepickerValid && basicSalaryValid && timeWorkingValid;
    return isFormValid;
}