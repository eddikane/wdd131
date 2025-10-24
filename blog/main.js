const articlesSection = document.querySelector("#articles");

function renderArticles(articleList) {
  articleList.forEach((item) => {
    const article = document.createElement("article");
    article.classList.add("review");

    const content = `
      <div class="review-details">
        <p>${item.date}</p>
        <p>${item.ages}</p>
        <p>${item.genre}</p>
        <p>${item.stars}</p>
      </div>
      <div class="review-content">
        <h2>${item.title}</h2>
        <img src="${item.imgSrc}" alt="${item.imgAlt}">
        <p>${item.description} <a href="#">Read more...</a></p>
      </div>
    `;

    
    article.innerHTML = content;

    
    articlesSection.appendChild(article);
  });
}


renderArticles(articles);

