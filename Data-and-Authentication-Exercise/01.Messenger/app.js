function attachEvents() {
    document.getElementById('submit').addEventListener('click', SendMessage)
    document.getElementById('refresh').addEventListener('click', loadMessages)
    loadMessages();
}

async function loadMessages() {
    var url = 'http://localhost:3030/jsonstore/messenger';
    const response = await fetch(url);
    const data = await response.json();
    displayMessages(data)
}

function displayMessages(data) {
    var area = document.getElementById('messages');
    area.innerHTML = '';
    Object.values(data).map(x => area.textContent += `${x.author}: ${x.content}` + '\n');
}
async function SendMessage() {

    var author = document.getElementById('author').value;
    var content = document.getElementById('content').value;
    if (author == '' || content == '') {
        alert('All fields are required!')
        return
    }
    var obj = { author, content }
    var url = 'http://localhost:3030/jsonstore/messenger';
    await fetch(url, {
        method: 'post',
        body: JSON.stringify(obj),
    })
    author.value = '';
    content.value = ''
    loadMessages();
}
//attach event on send msg
//attach event on refresh
//display messages
attachEvents();