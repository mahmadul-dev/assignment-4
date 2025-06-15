const recipes = document.querySelector(".recipes");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function loadData() {
  try {
    const res = await fetch(url);
    const data = await res.json();

    const charLimit = 50;

    const html = data.meals.map((meal) => {
      // Truncate instructions
      const shortText = meal.strInstructions.length > charLimit
        ? meal.strInstructions.slice(0, charLimit) + "..."
        : meal.strInstructions;

      return `
        <div class="recipe max-w-[250px] shadow-[2px_2px_6px_rgba(0,0,0,0.2)] rounded-lg overflow-hidden bg-white">
          <!-- Image Section -->
          <div class="w-full h-40 overflow-hidden">
            <img class="w-full h-full object-cover object-center"
              src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          </div>

          <!-- Content Section -->
          <div class="flex flex-col px-2 py-2">
            <h3 class="font-bold">${meal.strMeal}</h3>
            <p class="text-[14px] mb-2">${shortText}</p>
            <button class="bg-yellow-400 text-[14px] self-end px-2 py-1 rounded-sm">
              View Details
            </button>
          </div>
        </div>
      `;
    }).join(""); // Combine array into a single string

    recipes.innerHTML = html;

  } catch (error) {
    console.error("Error loading recipes:", error);
    recipes.innerHTML = "<p class='text-red-500'>Failed to load data.</p>";
  }
}

// loadData();
