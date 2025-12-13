let meals = JSON.parse(localStorage.getItem("meals")) || [];

const tips = [
  "Drink water before meals.",
  "Add protein to stay full longer.",
  "Choose whole foods when possible.",
  "Balance carbs with protein.",
  "Watch portion sizes."
];

function saveMeals() {
  localStorage.setItem("meals", JSON.stringify(meals));
}

function calculateTotal() {
  return meals.reduce((sum, meal) => sum + meal.calories, 0);
}

function displayTotal() {
  const totalEl = document.getElementById("totalCalories");
  if (totalEl) totalEl.textContent = calculateTotal();
}

function renderMeals() {
  const list = document.getElementById("mealList");
  if (!list) return;

  list.innerHTML = "";

  if (meals.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No meals yet. Add one above!";
    list.appendChild(empty);
    return;
  }

  meals.forEach(meal => {
    const div = document.createElement("div");
    div.textContent = `${meal.name} (${meal.category}) - ${meal.calories} cal`;
    list.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayTotal();
  renderMeals();

  const form = document.getElementById("mealForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const mealNameEl = document.getElementById("mealName");
      const mealCategoryEl = document.getElementById("mealCategory");
      const mealCaloriesEl = document.getElementById("mealCalories");

      const meal = {
        name: mealNameEl.value.trim(),
        category: mealCategoryEl.value,
        calories: Number(mealCaloriesEl.value)
      };

      
      if (!meal.name || isNaN(meal.calories) || meal.calories < 0) {
        alert("Please enter a valid meal name and calorie amount.");
        return;
      }

      meals.push(meal);
      saveMeals();
      renderMeals();
      displayTotal();
      form.reset();
    });
  }

  const tipBtn = document.getElementById("tipBtn");
  const tipText = document.getElementById("tipText");

  if (tipBtn && tipText) {
    tipBtn.addEventListener("click", () => {
      const random = Math.floor(Math.random() * tips.length);
      tipText.textContent = tips[random];
    });
  }
});
