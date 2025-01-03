const postComment = (url) => {

    const comment = document.getElementById('comment');

    fetch(url + comment.value, {method: 'POST'})
        .then(response => response.json())
        .then(data => {
            const div = document.createElement('div');
            div.className = 'comment';

            const span = document.createElement('span');
            span.className = 'comment-author';
            span.innerText = data.user;

            const para = document.createElement('p');
            para.innerText = data.comment

            div.appendChild(span);
            div.appendChild(para);
            document.getElementById('commentList').appendChild(div);

            comment.value = '';
        })
        .catch(error => console.error('Error fetching data:', error));
}
