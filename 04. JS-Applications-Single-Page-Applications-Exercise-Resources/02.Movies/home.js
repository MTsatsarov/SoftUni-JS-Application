import { showDetails } from "./details.js";

export function setupHome(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    container = document.querySelector(".card-deck.d-flex.justify-content-center")
    container.addEventListener('click', (event) => {
        if (event.target.classList.contains('movieDetailsLink')) {
            showDetails(event.target.id)
        }
    })
}

async function getMovies() {
    var response = await fetch('http://localhost:3030/data/movies')
    var data = await response.json();
    return data;
}

function createMoviePreview(movie) {
    const element = document.createElement('div')
    element.className = "card mb-4";
    element.innerHTML = `
<img class="card-img-top"
    src="${movie.img}"
    alt="Card image cap" width="400">
<div class="card-body">
    <h4 class="card-title">${movie.title}</h4>
</div>
<div class="card-footer">
    <a href="#/details/CUtL9j4qI0XVhn9kTUsx">
        <button id=${movie._id} type='button' class="btn btn-info movieDetailsLink">Details</button>
    </a>
</div>
`
    return element;
}
let main;
let section;
let container;

export async function showHome() {
    main.innerHTML = '';
    main.appendChild(section);

    var movies = await getMovies();
    const movieCards = movies.map(createMoviePreview)

    const fragment = document.createDocumentFragment();
    movieCards.forEach(x => fragment.appendChild(x))
    container.innerHTML = '';
    container.appendChild(fragment)


};