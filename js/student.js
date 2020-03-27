function emailIsValid(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
function save() {
    let fullname = document.getElementById('fullname').value;
    let address = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let date = document.getElementById('date').value;
    let gender = '';
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    }else if(document.getElementById('female').checked) {
        gender = document.getElementById('female').value;
    }

    if (_.isEmpty(fullname)){
        fullname = '';
        document.getElementById('fullname-error').innerHTML = '*vui long nhap day du ho ten';
    }else if (fullname.trim().length <=3){
        fullname = '';
        document.getElementById('fullname-error').innerHTML = '*khong nho hon 3 ky tu';
    }else {
        document.getElementById('fullname-error').innerHTML = '';
    }

    if (_.isEmpty(address)){
        address = '';
        document.getElementById('address-error').innerHTML = '*vui long nhap day du dia chi';
    }else if (address.trim().length <=3){
        address = '';
        document.getElementById('address-error').innerHTML = '*khong nho hon 3 ky tu';
    }else {
        document.getElementById('address-error').innerHTML = '';
    }

    if (_.isEmpty(phone)){
        phone = '';
        document.getElementById('phone-error').innerHTML = '*vui long nhap day du phone';
    }else if (phone.trim().length >10){
        phone = '';
        document.getElementById('phone-error').innerHTML = '*khong lon hon 10 chu so';
    }else {
        document.getElementById('phone-error').innerHTML = '';
    }

    if (_.isEmpty(email)){
        email = '';
        document.getElementById('email-error').innerHTML = '*vui long nhap day du email';
    }else if (!emailIsValid(email)){
        email = '';
        document.getElementById('email-error').innerHTML = '*khong dung dinh dang ';
    }else {
        document.getElementById('email-error').innerHTML = '';
    }

    if (_.isEmpty(date)){
        date = '';
        document.getElementById('date-error').innerHTML = '*vui long nhap day du date';
    }else {
        document.getElementById('date-error').innerHTML = '';
    }

    if (fullname && address && phone && email && date && gender){
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        students.push({
            fullname : fullname,
            address : address,
            phone : phone,
            email : email,
            date : date,
            gender : gender,
        });
        localStorage.setItem('students', JSON.stringify(students));
        this.renderListStudent();
    }
}

function renderListStudent() {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    if (students.length === 0) return false;
    let tableContent = `<tr>
            <td>#</td>
            <td>Name</td>
            <td>Address</td>
            <td>Phone</td>
            <td>Email</td>
            <td>Date Or Birth</td>
            <td>Gender</td>
            <td>Action</td>
        </tr>`;

    students.forEach((student, index) => {
        let studentId = index;
        index++;

        tableContent += `<tr>
            <td>${index}</td>
            <td>${student.fullname}</td>
            <td>${student.address}</td>
            <td>${student.phone}</td>
            <td>${student.email}</td>
            <td>${student.date}</td>
            <td>${student.gender}</td>
            <td>
            <a href="#" onclick="editStudent(${studentId})">Edit</a> | <a href="#" onclick="deleteStudent(${studentId})">Delete</a>
            </td>
        </tr>`;
    })
    document.getElementById('view-students').innerHTML = tableContent;
}

function deleteStudent(id) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    students.splice(id,1);
    localStorage.setItem('students', JSON.stringify(students));
    renderListStudent();
}

function editStudent(fullname, address, phone, email, date, gender) {
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
    document.getElementById('fullname').value = students.fullname;
    document.getElementById('address').value = students.address;
    document.getElementById('phone').value = students.phone;
    document.getElementById('email').value = students.email;
    document.getElementById('date').value = students.date;
    document.getElementById('gender').value = students.gender;
    localStorage.setItem('students', JSON.stringify(students));
    renderListStudent();
}