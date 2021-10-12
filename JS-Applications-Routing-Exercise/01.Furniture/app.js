import page from "./node_modules/page/page.mjs"
import { render } from "./node_modules/lit-html/lit-html.js"
import { createPage } from "./views/create.js";
import { dashboardPage } from "./views/dashboard.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js"
import { myFurniturePage } from "./views/myFurniture.js";

page('/', decorateContext, dashboardPage)
page('/dashboard', decorateContext, dashboardPage)
page('/login', decorateContext, loginPage)
page('/create', decorateContext, createPage)
page('/register', decorateContext, registerPage)
page('/details/:id', decorateContext, detailsPage)
page('/edit/:id', decorateContext, editPage)
page('/myFurniture', decorateContext, myFurniturePage)
page.setUserNav = setUserNav;
const main = document.querySelector('.container')

function decorateContext(ctx, next) {
    ctx.render = render;
    ctx.main = main;
    next();
}

setUserNav();
page.start();

function setUserNav() {
    const token = sessionStorage.getItem('authToken')
    if (token) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

document.getElementById('logoutBtn').addEventListener('click', logoutCurrentUser)

async function logoutCurrentUser() {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('email');
        page.redirect('/')
        setUserNav();
}