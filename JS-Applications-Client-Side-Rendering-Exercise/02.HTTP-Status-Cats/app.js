import { html, render,} from "../node_modules/lit-html/lit-html.js"
import { cats as catData } from "./catSeeder.js"
import {styleMap} from "../node_modules/lit-html/directives/style-map.js"
window.addEventListener('load', () => update(catList))
const section = document.getElementById('allCats');
catData.forEach(x => x.info = false)

var catList = catData;

function update(cats) {
    var catsCards = catsUltemplate(cats);
    render(catsCards, section)
}

const cardTemplate = (cat) => html`
<li>
    <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button class="showBtn">Show status code</button>
        <div class="status" style=${styleMap(cat.info? {display: 'block'} : {display: 'none'})} id="${cat.id}">
            <h4>Status Code: ${cat.statusCode}</h4>
            <p>${cat.statusMessage}</p>
        </div>
    </div>
</li>
`;


var catsUltemplate = (cats) => html`
<ul @click="${toggleCard}"> >
    ${cats.map(c => cardTemplate(c))}
</ul>
`;

function toggleCard(ev) {
    if (ev.target.tagName == 'BUTTON') {
       var cat = catList.find( x=> x.id == ev.target.parentNode.querySelector('div').id);
       cat.info = !cat.info
       update(catList,section);
    }
}
