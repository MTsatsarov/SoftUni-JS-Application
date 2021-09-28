import { e } from "./dom.js"
import { showHome } from './home.js'
async function getMovieDetails(id) {
    var response = await fetch('http://localhost:3030/data/movies/' + id);
    var data = await response.json();
    return data;
}

async function getLikesPerMovie(id) {
    var url = `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`
    const response = await fetch(url);
    var data = await response.json();

    return data;

}
async function getOwnLikes(id) {
    var userId = sessionStorage.getItem('userId');
    var url = `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22 `
    const response = await fetch(url);
    var data = await response.json();

    return data;
}
function createMovieCard(movie, likes, ownLike) {
    const controls = e('div', { className: "col-md-4 text-center" },
        e('h3', { className: 'my-3' }, 'MovieDescription'),
        e('p', {}, movie.description))

    async function deleteMovie(ev, id) {
        ev.preventDefault();
        var token = sessionStorage.getItem('authToken')
        confirm("Are you sure you want to delete this movie");
        if (confirm) {
            var response = await fetch("http://localhost:3030/data/movies/" + id, {
                method: 'delete',
                headers: { 'X-Authorization': token }
            });
            if (response.ok) {
                alert('Movie deleted');
                showHome();
            }
        }

    }
    var userId = sessionStorage.getItem('userId');
    if (userId != null) {
        if (userId == movie._ownerId) {
            controls.appendChild(e('a', { className: 'btn btn-danger', onClick: (e) => deleteMovie(e, movie._id), href: "#" }, "Delete"));
            controls.appendChild(e('a', { className: 'btn btn-warning', href: "#" }, "Edit"));
        } else if (ownLike.length == 0) {
            controls.appendChild(e('a', { className: 'btn btn-primary', onClick: likeMovie, href: "#" }, "Like"));
        }
    }
    var likesCount = e('span', { className: 'enrolled-span' }, likes + ' like' + (likes == 1 ? '' : 's'));
    controls.appendChild(likesCount);

    const element = document.createElement('div')
    element.classname = "container";
    var div = document.createElement('div');
    div.className = "row bg-light text-dark";
    var h1 = document.createElement('h1');
    h1.textContent = `Movie title: ${movie.title}`;
    div.appendChild(h1);
    var imgDiv = document.createElement('div');
    imgDiv.className = 'col-md-8';
    div.appendChild(imgDiv);
    var img = document.createElement('img');
    img.className = "img-thumbnail";
    img.src = movie.img;
    imgDiv.appendChild(img);
    element.appendChild(div);
    div.appendChild(controls)

    return element;
    async function likeMovie(ev) {
        const response = await fetch('http://localhost:3030/data/likes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.getItem('authToken')

            },
            body: JSON.stringify({ movieId: movie._id })
        })

        if (response.ok) {
            ev.target.remove();
            likes++;
            likesCount.textContent = likes + ' like' + (likes == 1 ? '' : 's');
        }
    };
}


export function setupDetails(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}

let main;
let section;
export async function showDetails(id) {
    section.innerHTML = '';
    main.innerHTML = '';
    main.appendChild(section);
    const [movie, likes, ownLike] = await Promise.all([
        getMovieDetails(id),
        getLikesPerMovie(id),
        getOwnLikes(id),
    ])

    var result = createMovieCard(movie, likes, ownLike)
    section.appendChild(result);
};