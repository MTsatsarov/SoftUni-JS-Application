import { html, render } from "../node_modules/lit-html/lit-html.js"

document.querySelector('#searchBtn').addEventListener('click', onClick);
var tbody = document.querySelector('tbody');

 function onClick() {

   var input = document.getElementById('searchField');
var value = input.value
input.value= ''; 
    getTable(value)

}

async function getTable(match = '') {
   const result = await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await result.json();
   var rows = Object.values(data).map(x => tableTemplate(x,compare(x,match)));
   render(rows, tbody)
}

const tableTemplate = (row, select) => html`
<tr class=${select ? 'select'  : '' }>
   <td>${row.firstName} ${row.lastName}/td>
   <td>${row.email}</td>
   <td>${row.course}</td>
</tr>
`;

await getTable();

function compare(item,match) {
   return Object.values(item).some(x=> match && x.toLowerCase().includes(match.toLowerCase()))
}