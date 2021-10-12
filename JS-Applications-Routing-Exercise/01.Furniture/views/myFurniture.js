import { getMyFurniture } from "../data.js";
import { html } from "../node_modules/lit-html/lit-html.js"
export async function myFurniturePage(ctx) {
    var userId = sessionStorage.getItem('userId')
    if (userId) {
        var furniture = await getMyFurniture(userId);
        ctx.render(dashboardTemplate(furniture), ctx.main);
    }
}




const dashboardTemplate = (furniture) => html`
<div class="row space-top">
    ${furniture.map(singleFurnitureTemplate)}

</div>
`;

const singleFurnitureTemplate = (currFurniture) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${currFurniture.img} />
            <p>${currFurniture.description}</p>
            <footer>
                <p>Price: <span>${currFurniture.price} $</span></p>
            </footer>
            <div>
                <a href='/details/${currFurniture._id}' class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>
`;