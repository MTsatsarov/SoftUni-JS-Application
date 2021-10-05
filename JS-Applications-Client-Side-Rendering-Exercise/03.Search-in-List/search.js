import { towns as townList } from "./towns.js";
import { html, render } from "../node_modules/lit-html/lit-html.js"

window.addEventListener('load', InitialTownsDisplay)

function InitialTownsDisplay() {
   render(townsUlTemplate(townList), document.body)
   document.querySelector('button').addEventListener('click', markMatches)
}

const townLi = (town, match) => html`
<li class=${match && town.toLowerCase().includes(match.toLowerCase()) ? 'active' : '' }>${town}</li>
`;

const townsUlTemplate = (towns, match) => html`
<article>
   <div id="towns">
      <ul>
         ${towns.map(t => townLi(t, match))}
      </ul>
   </div>
   <input type="text" id="searchText" />
   <button>Search</button>
   <div id="result">${matchesCount(towns, match)}</div>
</article>

`;

function markMatches() {
   var match = document.getElementById('searchText').value;
   var result = townsUlTemplate(townList, match);
   render(result, document.body)
}

function matchesCount(towns, match) {
   var matches = towns.filter(t => match && t.toLowerCase().includes(match.toLowerCase())).length;
   if (matches) {
      return matches + ' matches found';
   } else {
      return ''
   }
}