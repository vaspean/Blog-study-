(async () => {
  const START_PAGE_NUMBER = 1;
  let paramsString = window.location.search;
  let searchParams = new URLSearchParams(paramsString);
  let currentPage;

  if (searchParams.get(`page`) == null) {
    currentPage = START_PAGE_NUMBER;
  } else {
    currentPage = searchParams.get(`page`)
  }

  let countOfPages = `  `;

  async function getPage(pageId) {
    const response = await fetch(`https://gorest.co.in/public-api/posts?page=${pageId}`, {
      method: `GET`
    })
    const page = await response.json();
    return page;
  }

  let pageObject = await getPage(currentPage);
  let pages = pageObject.meta.pagination.pages
  let blogLinks = document.getElementById(`blog__links`);

  async function drawBlogLinks(page) {
    let pages = await getPage(page)
    for (let dataObject of pages.data) {
      let li = document.createElement(`li`);
      li.classList.add(`list-group-item`)
      let link = document.createElement(`a`);
      link.href = `blog.html?id=${dataObject.id}`
      link.textContent = dataObject.title;
      blogLinks.append(li);
      li.append(link)
    }
    countOfPages = await pages.meta.pagination.pages;
    drawPagesCount();
  }

  function drawPagesCount() {
    let pageCounterContainer = document.getElementById(`page_counter`);
    pageCounterContainer.textContent = `${currentPage} из ${countOfPages}`;
  }

  let previousPageButton = document.createElement(`button`);
  let nextPageButton = document.createElement(`button`);
  previousPageButton.textContent = `Предыдущая страница`;
  previousPageButton.classList.add(`btn`)
  previousPageButton.classList.add(`btn-dark`)

  if (currentPage < 2) {
    previousPageButton.classList.add(`invisible`)
  }
  if (currentPage > pages - 1) {
    nextPageButton.classList.add(`invisible`)
  }

  nextPageButton.textContent = `Следующая страница`;
  nextPageButton.classList.add(`btn`)
  nextPageButton.classList.add(`btn-dark`)
  let buttonContainer = document.getElementById(`button__container`);
  buttonContainer.append(previousPageButton);
  buttonContainer.append(nextPageButton);
  drawBlogLinks(currentPage);
  drawPagesCount();

  previousPageButton.addEventListener(`click`, () => {
    currentPage--;
    // document.location.href = `index.html?page=${currentPage}`;
    document.location.href = `${window.location.pathname}?page=${currentPage}`;
  })

  nextPageButton.addEventListener(`click`, () => {
    currentPage++;
    // document.location.href = `index.html?page=${currentPage}`;
    document.location.href = `${window.location.pathname}?page=${currentPage}`;
  })

  let navigation = document.getElementById(`navigation`)
  for (let i = 0; i < pages; i++) {
    let li = document.createElement(`li`);
    li.classList.add(`nav-li`)
    let navLink = document.createElement(`a`);
    navLink.textContent = i + 1;
    navLink.classList.add(`navLink`);
    // navLink.href = (`/index.html?page=${i + 1}`)
    navLink.href = (`${window.location.pathname}?page=${i + 1}`)
    navigation.append(li);
    li.append(navLink);
  }
})()
