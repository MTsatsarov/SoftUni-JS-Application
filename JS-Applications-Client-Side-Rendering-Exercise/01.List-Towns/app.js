import { html, render } from "../node_modules/lit-html/lit-html.js";

start();
const townDiv = document.getElementById('root');
function start() {
    document.querySelector('form').addEventListener('submit', loadTowns);
}

const LiTemplate = (town) => html`
    <li>${town}</li>
`;

var ulTemplate = (towns) => html`
<ul>
    ${towns.map(LiTemplate)}
    <ul>
`;

function loadTowns(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    var towns = formData.get('towns').split(',').map(x => x.trim());
    var result = ulTemplate(towns);
    render(result, townDiv)
}