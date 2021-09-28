export function setupRegister(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    const form = document.querySelector('form');
    form.addEventListener('submit', onSubmit)
}

async function onSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('repeatPassword')
    if (email == '' || password == '') {
        return alert('All fields are required.')
    }
    else if (password !== rePass) {
        return alert('Password don\'t match')
    }
    var response = await fetch('http://localhost:3030/users/register', {
        method: 'post',
        headers: { 'Content-Type': "application-json" },
        body: JSON.stringify({ email, password })
    });
    if (response.ok) {
        event.target.reset
        const data = await response.json();
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('email', data.email);

        document.getElementById('welcomeMsg').textContent = `Welcome ${sessionStorage.getItem('email')}`;
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'none');


        showHome();
    }

};

let main;
let section;
export async function showRegister() {
    main.innerHTML = '';
    main.appendChild(section);

}