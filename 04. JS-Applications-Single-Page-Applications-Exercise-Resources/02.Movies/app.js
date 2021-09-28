import { setupHome, showHome } from "./home.js";
import { setupDetails } from "./details.js";
import { setupLogin, showLogin } from "./login.js";
import { setupRegister, showRegister } from "./register.js";
import { setupCreate, showCreate } from "./create.js";
import { setupEdit } from "./edit.js";

const main = document.querySelector('main');
main.innerHTML = '';
function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId);
    setup(main, section)
}

setupSection('home-page', setupHome);
setupSection('add-movie', setupCreate);
setupSection('movie-details', setupDetails);
setupSection('edit-movie', setupEdit);
setupSection('form-login', setupLogin);
setupSection('form-sign-up', setupRegister);

setupNavigation();

// App starts in homeView

await showHome();
const links = {
    'homeLink': showHome,
    'loginLink': showLogin,
    'registerLink': showRegister,
    'createLink': showCreate,
}

function setupNavigation() {
    const token = sessionStorage.getItem('authToken');

    if (token != null) {
        document.getElementById('welcomeMsg').textContent = `Welcome ${sessionStorage.getItem('email')}`;
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'none');
    }
    else {
        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'none');
    }
    document.getElementById('createMovieLink').addEventListener('click', (event) => {
        event.preventDefault();
        showCreate();
    });
    document.getElementById('logoutLink').addEventListener('click', logout)
    document.querySelector('nav').addEventListener('click', (event) => {
        if (event.target.tagName == 'A') {
            const view = links[event.target.id]
            event.preventDefault();
            if (typeof view == 'function') {
                view();
            }

        };

    })
}
async function logout() {
    const token = sessionStorage.getItem('authToken');
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: { 'X-Authorization': token }
    })

    if (response.ok) {
     sessionStorage.clear();

        [...document.querySelectorAll('nav .guest')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('nav .user')].forEach(l => l.style.display = 'none');

        showHome();
    } else {
        const error = await response.json();
        alert(error.message);
    }
}

//import modules
//grab sections
//setup modules
//setup navigation