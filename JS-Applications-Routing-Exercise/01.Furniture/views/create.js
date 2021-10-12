import { html } from "../node_modules/lit-html/lit-html.js"
import { createFurniture } from "../data.js"
export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit), ctx.main)
    async function onSubmit(ev) {
        ev.preventDefault();
        var formData = new FormData(ev.target)
        var make = formData.get('make')
        var model = formData.get('model')
        var year = formData.get('year')
        var description = formData.get('description')
        var price = Number(formData.get('price'));
        var img = formData.get('img')
        var material = formData.get('material')
        if (make.length < 4) {
            document.getElementById('new-make').classList.add('is-invalid')
        }
        else if (model.length < 4) {
            document.getElementById('new-model').classList.add('is-invalid')
        }
        else if (year < 1950 || year > 2050) {
            document.getElementById('new-year').classList.add('is-invalid')
        }
        else if (description.length <= 10) {
            document.getElementById('new-description').classList.add('is-invalid')
        }

        else if (price <= 0) {
            document.getElementById('new-price').classList.add('is-invalid')
        }
        else if (img == '') {
            document.getElementById('new-image').classList.add('is-invalid')
        } else {

            await createFurniture({
                make: make, model: model, year: year, description: description,
                price: price, img: img, material: material
            })
            ctx.page.redirect("/")
        }
    }
}




const createTemplate = (onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control valid" id="new-make" type="text" name="make">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control" id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control " id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material">
            </div>
            <input type="submit" class="btn btn-primary" value="Create" />
        </div>
    </div>
</form>`;