import { html } from "../node_modules/lit-html/lit-html.js"
import { loginUser } from "../data.js"
import page from "../node_modules/page/page.mjs"

export async function loginPage(ctx) {
    ctx.render(loginTemplate(), ctx.main)
}



const loginTemplate = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class="form-control" id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class="form-control" id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;



async function onSubmit(ev) {
    ev.preventDefault();

    var formData = new FormData(ev.target);
    const email = formData.get('email')
    const password = formData.get('password')

    if (email == '' || password == '') {
        alert('All fields are required.')
    }
    else {
        const result = await loginUser({ email: email, password: password });
        sessionStorage.setItem('authToken', result.accessToken);
        sessionStorage.setItem('email', result.email);
        sessionStorage.setItem('userId', result._id)
        console.log(sessionStorage.getItem('userId'))
        page.setUserNav();
        page.redirect('/');
    }
}