import { showDetails } from './details.js'
export function setupCreate(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    document.querySelector('form').addEventListener('submit', onCreate)
}
async function onCreate(ev) {
    ev.preventDefault();
    var formData = new FormData(ev.target);
    var title = formData.get('title');
    var description = formData.get('description');
    var imageUrl = formData.get('imageUrl');
    const token = sessionStorage.getItem('authToken')
    const response = await fetch('http://localhost:3030/data/movies', {
        method: 'post',
        headers: { 'X-Authorization': token },
        body: JSON.stringify({ title, description, imageUrl })
    });
    if (title == '' || description == '' || imageUrl == '') {
        alert('All fields are required.');
    }
    if (response.ok) {
        var movie = await response.json();
        showDetails(movie._id);
    } else {
        var error = await response.json();
        alert(error.message);
    }
}
let main;
let section;
export async function showCreate() {
    main.innerHTML = '';
    main.appendChild(section);
};