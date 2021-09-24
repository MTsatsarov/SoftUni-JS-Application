function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', ShowNumbers)
    document.getElementById('btnCreate').addEventListener('click', CreateContact)
}
async function ShowNumbers() {
    var url = 'http://localhost:3030/jsonstore/phonebook';
    const response = await fetch(url);
    const data = await response.json();
    DisplayPhoneNumbers(data)
}
attachEvents();
async function CreateContact() {
    var url = 'http://localhost:3030/jsonstore/phonebook';
    var person = document.getElementById('person').value;
    var phone = document.getElementById('phone').value;
    var obj = {person, phone };

console.log(person,phone)
    var response = await fetch(url, {
        method: 'post',
        body: JSON.stringify(obj)
    })
    ShowNumbers();
}
function DisplayPhoneNumbers(data) {
    var ul = document.getElementById('phonebook');
    ul.innerHTML = '';
    Object.values(data).forEach(x => createLiElements(x, ul))
}

function createLiElements(phone, ul) {
    console.log(phone)
    var li = document.createElement('li');
    li.textContent = `${phone.person}:  ${phone.phone}`
    var deleteBtn = document.createElement('button');
    deleteBtn.id = `${phone._id}`;
    deleteBtn.textContent = 'Delete'
    li.appendChild(deleteBtn)
    ul.appendChild(li);
    ul.addEventListener('click', DeleteNum)
}

async function DeleteNum(ev) {
    if (ev.target.tagName == 'BUTTON') {
        var url = 'http://localhost:3030/jsonstore/phonebook/' + ev.target.id
        await fetch(url, {
            method: 'delete',
            body: JSON.stringify(ev.target.id)
        })
        await ShowNumbers();
    }
}


