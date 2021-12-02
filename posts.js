(async () => {
    let paramsString = window.location.search;
    let searchParams = new URLSearchParams(paramsString);
    let id = searchParams.get(`id`);
    let headerBlog = document.getElementById(`blogHeader`);
    let blogParagraph = document.getElementById(`blogParagraph`);
    async function getBlog(id) {
        const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`, {
            method: `GET`
        })
        const blog = await response.json();
        return blog;
    }
    let idObject = await getBlog(id);
    headerBlog.textContent = idObject.data.title;
    blogParagraph.textContent = idObject.data.body;
    async function getComment(id) {
        const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`, {
            method: `GET`
        })
        const comment = await response.json();
        return comment;
    }
    let comment = await getComment(id);
    let commentsHeader = document.getElementById(`commentsHeader`);
    let blog__links = document.getElementById(`blog__links`);

    commentsHeader.textContent = commentsHeader.textContent + `(${comment.meta.pagination.total})`


    for (let commentData of comment.data) {
        let li = document.createElement(`li`);
        let h4 = document.createElement(`h4`);
        let p = document.createElement(`p`);
        h4.textContent = commentData.name;
        p.textContent = commentData.body;
        li.classList.add(`list-group-item`)
        li.classList.add(`p-4`)
        h4.classList.add(`mt-2`)
        li.append(h4);
        li.append(p);
        blog__links.append(li);
    }

    let pagesLink = document.getElementById(`pagesLink`);
    pagesLink.addEventListener(`click`, () => {
        window.history.back();
    })

})()