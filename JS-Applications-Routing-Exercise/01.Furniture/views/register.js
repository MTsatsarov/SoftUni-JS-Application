import { html } from "../node_modules/lit-html/lit-html.js"
import page from "../node_modules/page/page.mjs"
import { registerUser } from "../data.js"
export async function registerPage(ctx) {
    ctx.render(registerTemplate(), ctx.main)
}


const registerTemplate = () => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Register New User</h1>
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
            <div class="form-group">
                <label class="form-control-label" for="rePass">Repeat</label>
                <input class="form-control" id="rePass" type="password" name="rePass">
            </div>
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </div>
</form>`;



async function onSubmit(ev) {
    ev.preventDefault();

    var formData = new FormData(ev.target);
    const email = formData.get('email')
    const password = formData.get('password')
    const rePass = formData.get('rePass');

    if (email == '' || password == '' || rePass == '') {
        alert('All fields are required.')
    }
    else if (password != rePass) {
        alert('Password don\'t match')
    } else {
     const result =   await registerUser({ email: email, password: password })
         page.redirect('/login')
    }
}