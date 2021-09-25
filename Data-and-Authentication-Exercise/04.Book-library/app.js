window.addEventListener('load', AttachEvents)

function AttachEvents() {
    document.getElementById('loadBooks').addEventListener('click', LoadAllBooks)
    document.getElementById('CreateForm').addEventListener('submit', CreateBook)
    document.getElementById('EditForm').addEventListener('submit', EditBook)
}


async function LoadAllBooks() {
    var url = 'http://localhost:3030/jsonstore/collections/books';
    const response = await fetch(url);
    var tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    const data = await response.json();
    Object.entries(data).forEach(x => createBooksHtml(x, tbody));
}


function createBooksHtml([id, row], tbody) {
    var bookTr = document.createElement('tr');
    const titleTd = document.createElement('td');
    titleTd.textContent = row.title;
    bookTr.appendChild(titleTd);

    const authorTd = document.createElement('td');
    authorTd.textContent = row.author;
    bookTr.appendChild(authorTd);

    var buttonsTd = document.createElement('td');
    buttonsTd.id = id;
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', DisplayBook)
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => DeleteBook(buttonsTd.id));
    buttonsTd.appendChild(editButton)
    buttonsTd.appendChild(deleteButton)
    bookTr.appendChild(buttonsTd);

    tbody.appendChild(bookTr);
}

async function DeleteBook(id) {
    confirm('Are you sure that you want to delete this book.')
    if (confirm) {
        var url = 'http://localhost:3030/jsonstore/collections/books/' + id
        await fetch(url, {
            method: 'delete',
        })
        await LoadAllBooks()
    }
}

async function CreateBook(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    var obj = {
        title: formData.get('title'),
        author: formData.get('author'),
    }


    var url = 'http://localhost:3030/jsonstore/collections/books/';
    await fetch(url, {
        method: 'post',
        body: JSON.stringify(obj)
    })
    await LoadAllBooks();
}

function DisplayBook(ev) {
    document.getElementById('CreateForm').style.display = 'none';
    var editForm = document.getElementById('EditForm');
    editForm.style.display = 'block';
    var title = ev.target.parentNode.parentNode.children[0].textContent;
    var id = ev.target.parentNode.id;
    var author = ev.target.parentNode.parentNode.children[1].textContent;
    editForm.title.value = title;
    editForm.author.value = author
    editForm.id.value = id;

}
async function EditBook(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    var obj = {
        title: formData.get('title'),
        author: formData.get('author'),
    }
    var id = formData.get('id');
    var url = 'http://localhost:3030/jsonstore/collections/books/'+id;
    await fetch(url, {
        method: 'put',
        body: JSON.stringify(obj)
    })
    await LoadAllBooks();
}