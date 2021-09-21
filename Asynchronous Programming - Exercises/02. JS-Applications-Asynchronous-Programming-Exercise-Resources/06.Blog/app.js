function attachEvents() {
    document.getElementById('btnLoadPosts').addEventListener('click', GetPosts);
    document.getElementById('btnViewPost').addEventListener('click', displayPost)
}

attachEvents();

function displayPost() {
    var postId = document.getElementById('posts').value;
    getCommentsPerPostId(postId)
}
async function GetPosts() {
    var url = 'http://localhost:3030/jsonstore/blog/posts';
    var response = await fetch(url);
    var data = await response.json();
    var select = document.getElementById('posts');
    Object.values(data).forEach(x => CreateOption(select, x.id, x.title))
}


function CreateOption(select, value, textContent) {
    var option = document.createElement('option');
    option.value = value;
    option.textContent = textContent;
    select.appendChild(option);
}

async function getCommentsPerPostId(postId) {
    var commentsUl = document.getElementById('post-comments');
    commentsUl.innerHTML = ' ';
    var postUlElement = document.getElementById('post-body');
    postUlElement.innerHTML=''
    try {


        console.log(postId)
        var [post, comments] = await Promise.all([
            fetch('http://localhost:3030/jsonstore/blog/posts/' + postId),
            fetch('http://localhost:3030/jsonstore/blog/comments/')
        ])

        var postData = await post.json();
        var commentsData = await comments.json();
       
        var postLiElement = document.createElement('li');
        postLiElement.textContent = postData.body
        postUlElement.appendChild(postLiElement);



        var commentsArr = Object.values(commentsData).filter(x => x.postId == postId).forEach(x => {
            var liElement = document.createElement('li');
            liElement.id = x.id;
            liElement.textContent = x.text;
            commentsUl.appendChild(liElement);
        });


    } catch (error) {
        console.log(error.message)
    }
}