import recipes from "./recipes.mjs";

function random(num) {
  return Math.floor(Math.random() * num);
}


function getRandomListEntry(list) {
  return list[random(list.length)];
}

function tagsTemplate(tags) {
  const tagList = tags
    .map(tag => `<li>${tag}</li>`)
    .join("");
  return `<ul class="recipe__tags">${tagList}</ul>`;
}


function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }

  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `
    <figure class="recipe">
      <img src="${recipe.image}" alt="${recipe.name}" loading="lazy" decoding="async">

      <figcaption>
        ${tagsTemplate(recipe.tags)}
        <h2>${recipe.name}</h2>

        <p class="recipe__ratings">
          ${ratingTemplate(recipe.rating)}
        </p>

        <p class="recipe__description">
          ${recipe.description}
        </p>
      </figcaption>
    </figure>
  `;
}

function renderRecipes(recipeList) {
  const container = document.querySelector("#recipeDisplay");

  const html = recipeList
    .map(recipe => recipeTemplate(recipe))
    .join("");

  container.innerHTML = html;
}


function filterRecipes(query) {
  const filtered = recipes.filter(recipe => {
    const nameMatch = recipe.name.toLowerCase().includes(query);
    const descMatch = recipe.description.toLowerCase().includes(query);

    const tagMatch = recipe.tags.find(tag =>
      tag.toLowerCase().includes(query)
    );

    const ingredientMatch =
      recipe.ingredients &&
      recipe.ingredients.find(ing =>
        ing.toLowerCase().includes(query)
      );

    return nameMatch || descMatch || tagMatch || ingredientMatch;
  });

  // Sort alphabetically by recipe name
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}


function searchHandler(e) {
  e.preventDefault();

  const input = document.querySelector("#search");
  const query = input.value.toLowerCase().trim();

  const results = filterRecipes(query);
  renderRecipes(results);
}

document
  .querySelector(".search-bar button")
  .addEventListener("click", searchHandler);

document
  .querySelector("#search")
  .addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchHandler(e);
  });


function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}

init();


