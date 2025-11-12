// main.js
import recipes from "./recipes.mjs";

const main = document.querySelector("main");

// Helper function to create star ratings visually and accessibly
function getStarRating(rating) {
  const filledStars = "⭐".repeat(Math.floor(rating));
  const emptyStars = "☆".repeat(5 - Math.floor(rating));
  return `${filledStars}${emptyStars}`;
}

// Create HTML template for each recipe
function recipeTemplate(recipe) {
  return `
    <article class="recipe">
      <img src="${recipe.image}" alt="${recipe.name}" width="400" height="300" loading="lazy" decoding="async">
      <div class="recipe-details">
        <div class="tags">
          ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <h2>${recipe.name}</h2>
        <span class="rating" role="img" aria-label="Rating: ${recipe.rating} out of 5 stars">
          ${getStarRating(recipe.rating)}
        </span>
        <p>${recipe.description}</p>
      </div>
    </article>
  `;
}

// Render all recipes on the page
function renderRecipes(recipesList) {
  const html = recipesList.map(recipeTemplate).join("");
  main.innerHTML = `
    <form class="search-bar" role="search">
      <input id="search" type="text" placeholder="Find a recipe" aria-label="Search recipes">
      <button type="submit">
        <img src="images/images/search.svg" alt="Search icon" width="20" height="20" decoding="async">
      </button>
    </form>
    ${html}
  `;
}

// Initial render of all recipes
renderRecipes(recipes);

// Listen for search form submissions and filter recipes dynamically
document.addEventListener("submit", event => {
  event.preventDefault();
  const input = document.querySelector("#search").value.toLowerCase();
  const filtered = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(input) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(input))
  );
  renderRecipes(filtered);
});

