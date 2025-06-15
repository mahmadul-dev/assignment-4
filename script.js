const recipesContainer = document.querySelector(".recipes");
const searchInput = document.querySelector("input[name='Search']");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let allMeals = []; // Cache for filtering

const charLimit = 50;

// Load all meals initially
async function loadData() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    allMeals = data.meals || [];
    renderMeals(allMeals); // Initial render
  } catch (error) {
    recipesContainer.innerHTML = `<p class="text-red-500">Failed to load recipes.</p>`;
  }
}

// Render function
function renderMeals(meals) {
  const html = meals.map(meal => {
    const shortText = meal.strInstructions.length > charLimit
      ? meal.strInstructions.slice(0, charLimit) + "..."
      : meal.strInstructions;

    return `
      <div class="recipe max-w-[250px] shadow-[2px_2px_6px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden bg-white">
        <div class="w-full h-40 overflow-hidden">
          <img class="w-full h-full object-cover object-center"
            src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        </div>
        <div class="flex flex-col px-2 py-2">
          <h3 class="font-bold">${meal.strMeal}</h3>
          <p class="text-[14px] mb-2">${shortText}</p>
          <button class="bg-yellow-400 text-[14px] self-end px-2 py-1 rounded-sm">
            View Details
          </button>
        </div>
      </div>
    `;
  }).join("");

  recipesContainer.innerHTML = html || `<p class="text-center w-full text-red-500">No matching recipes found.</p>`;
}

// Live search functionality
searchInput.addEventListener("keyup", () => {
  const query = searchInput.value.toLowerCase();
  const filteredMeals = allMeals.filter(meal =>
    meal.strMeal.toLowerCase().includes(query)
  );
  renderMeals(filteredMeals);
});

loadData();
