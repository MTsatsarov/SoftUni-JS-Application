window.addEventListener('load', async function solution() {
    var section = document.getElementById('main');
    var url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    try {
        const response = await fetch(url);
        var data = await response.json();
    }
    catch (error) {
        alert(error.message)
    }

    Array.from(data).forEach(x => CreateArticles(x, section))
});



function CreateArticles(data, section) {
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('accordion');
    var headDiv = document.createElement('div');
    headDiv.classList.add('head');
    mainDiv.appendChild(headDiv);

    var spanElement = document.createElement('span');
    spanElement.textContent = data.title;
    headDiv.appendChild(spanElement);

    var btn = document.createElement('button');
    btn.classList.add('button');
    btn.id = data._id;
    btn.textContent = 'More';
    headDiv.appendChild(btn);

    var extraDivElement = document.createElement('div');
    extraDivElement.classList.add('extra');
    var pElement = document.createElement('p');
    extraDivElement.appendChild(pElement);
    mainDiv.appendChild(extraDivElement);

    section.appendChild(mainDiv);

    section.addEventListener('click', ShowMore);
}


async function ShowMore(ev) {
    if (ev.target.tagName == 'BUTTON') {
        var p = ev.target.parentNode.parentNode.lastChild.firstChild;
        var div = p.parentNode;
        if (ev.target.textContent != 'More') {
            div.style.display = 'none';
            ev.target.textContent = 'More'
        } else {
            var id = ev.target.id
            var result = await FetchContent(id);

            p.textContent = result.content;
            div.style.display = 'flex';
            ev.target.textContent = 'Hide'
        }
    }
}


async function FetchContent(id) {
    var url = 'http://localhost:3030/jsonstore/advanced/articles/details/' + id;
    const response = await fetch(url)
    data = await response.json();
    return data;
}