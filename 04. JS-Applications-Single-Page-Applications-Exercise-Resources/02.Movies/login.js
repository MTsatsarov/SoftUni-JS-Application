import { showHome } from "./home.js"
export function setupLogin(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    var form = section.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        var formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        var response = await fetch('http://localhost:3030/users/login', {
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
        } else {
            const error = await response.json();
            alert(error.message);
        }
    });

}

let main;
let section;
export async function showLogin() {
    main.innerHTML = '';
    main.appendChild(section);
};