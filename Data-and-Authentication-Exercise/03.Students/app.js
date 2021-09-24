function attachEvents() {
    document.getElementById('form').addEventListener('submit', CreateStudent)
    DisplayAllStudents()

}
attachEvents();

async function DisplayAllStudents() {
    var url = 'http://localhost:3030/jsonstore/collections/students';
    var response = await fetch(url);
    var data = await response.json();
    var tBody = document.querySelector('tbody');
    tBody.innerHTML='';
    Object.values(data).forEach(x => CreateStudentHtml(x,tBody));
}

function CreateStudentHtml(student,tBody) {
    
 
    var tr = document.createElement('tr');
    var firstNameTd = document.createElement('td');
    firstNameTd.textContent = student.firstName;
    tr.appendChild(firstNameTd);

    var lastNameTd = document.createElement('td');
    lastNameTd.textContent = student.lastName;
    tr.appendChild(lastNameTd);

    var fNumberTd = document.createElement('td');
    fNumberTd.textContent = student.facultyNumber;
    tr.appendChild(fNumberTd);

    var gradeTd = document.createElement('td');
    gradeTd.textContent = student.grade;
    tr.appendChild(gradeTd);
    tBody.appendChild(tr);
}
async function CreateStudent(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    var obj = {
        firstName: formData.get('firstName'),
        lastName: formData.get('firstName'),
        facultyNumber: formData.get('facultyNumber'),
        grade: formData.get('grade')
    }
    await PostStudent(obj)
}

async function PostStudent(obj) {
    var url = 'http://localhost:3030/jsonstore/collections/students';
    await fetch(url, {
        method: 'post',
        body: JSON.stringify(obj)
    })
    await DisplayAllStudents();
}