import { showDetails } from './details.js'
let main;
let section;
let id ;
export function setupEdit(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    section.querySelector('form').addEventListener('submit',editForm);
}

export async function showEdit(movie) {
    var title = section.querySelector('[name=title]');
    var description = section.querySelector('[name=description]');
    var imageUrl = section.querySelector('[name=imageUrl]');
    imageUrl.value = movie.img;
    description.value = movie.description
    title.value = movie.title
    main.innerHTML = '';
    main.appendChild(section);
    id= movie._id;
};

async function editForm(ev) {
    ev.preventDefault();
    var formData = new FormData(ev.target);
    var title = formData.get('title');
    var description = formData.get('description');
    var imageUrl = formData.get('imageUrl');
    const token = sessionStorage.getItem('authToken')
    const response = await fetch('http://localhost:3030/data/movies/' + id, {
        method: 'put',
        headers: { 'X-Authorization': token },
        body: JSON.stringify({ title, description, imageUrl })
    })
    if (response.ok) {
        showDetails(id)
    } else {
        var error = await response.json();
        alert(error.message)
    }
}