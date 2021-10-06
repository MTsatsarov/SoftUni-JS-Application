import { html, render } from "../node_modules/lit-html/lit-html.js"

const select = document.getElementById('menu')
document.querySelector('form').addEventListener('submit', addCity)

async function getList() {
    const result = await fetch('http://localhost:3030/jsonstore/advanced/dropdown')
    const data = await result.json();
    return data;
}

async function postCity(city) {
    const result = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: city }),
    })

}


async function addCity(ev) {
    ev.preventDefault();
    var value = document.getElementById('itemText').value;
    await postCity(value)
    await display();
}

async function display() {
    var result = await getList();
    var cities = Object.values(result).map(optionTemplate);
    render(cities, menu)
}


const optionTemplate = (city) => html`
<option value=${city._id}>${city.text}</option>
`;

await display();