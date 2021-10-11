import { html } from "../node_modules/lit-html/lit-html.js"
import { getFurnitureDetails, updateFurniture } from "../data.js"
export async function editPage(ctx) {
    var furniture = await getFurnitureDetails(ctx.params.id)
    ctx.render(editTemplate(furniture,onSubmit), ctx.main)

    async function onSubmit(ev) {
        ev.preventDefault();
        var formData = new FormData(ev.target)
        var make = formData.get('make');
        var model = formData.get('model');
        var year = formData.get('year');
        var description = formData.get('description');
        var price = formData.get('price');
        var image = formData.get('img')
        var material = formData.get('material')
        var updatedFurniture = {
            make: make,
            model: model,
            year: year,
            description: description,
            price: price,
            img: image,
            material: material
        }
        console.log(ctx.params.id)
        await updateFurniture(ctx.params.id,updatedFurniture)
        await ctx.page.redirect('/')
    }
}


const editTemplate = (furniture,onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit = ${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" .value="${furniture.make}">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control is-valid" id="new-model" type="text" name="model"
                    .value="${furniture.model}">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control is-invalid" id="new-year" type="number" name="year"
                    value="${furniture.year}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description"
                    value="${furniture.description}">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" value="${furniture.price}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" value="${furniture.img}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" value="${furniture.material}">
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>
`;
