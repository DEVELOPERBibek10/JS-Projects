const searchBtn = document.querySelector("button");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const closeBtn = document.getElementById("recipe-close-btn");
const container = document.querySelector(".container");
const light = document.querySelector("#light");
const dark = document.querySelector("#dark");

searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", fetchMealRecipe);
closeBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showDetails");
});

function getMealList() {
  let searchInputTxt = document.getElementById("searchBox").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals && searchInputTxt !== "") {
        data.meals.forEach((meal) => {
          html += ` 
      <div class="meal-item" data-id="${meal.idMeal}">
            <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="" />
            </div>
            <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Get Recipe</a>
            </div>
        </div>`;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry! No meal found!";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
}

function fetchMealRecipe(event) {
  event.preventDefault();
  if (event.target.classList.contains("recipe-btn")) {
    let mealItem = event.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => displayMealRecipe(data.meals));
  }
}

function displayMealRecipe(meal) {
  meal = meal[0];
  let html = `       
  <h2 class="recipe-title">${meal.strMeal}</h2>
              <p class="recipe-category">${meal.strCategory}</p>
              <div class="recipe-instruct">
                <h3>Instructions</h3>
                <p>
                  ${meal.strInstructions}
                </p>
              </div>
              <div class="recipe-meal-img">
                <img src="${meal.strMealThumb}" alt="" />
              </div>
              <div class="recipe-link">
                <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
              </div>`;

  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showDetails");
}

dark.style.display = "none";

dark.addEventListener("click", lightTheme);
light.addEventListener("click", darkTheme);

function darkTheme() {
  light.style.display = "none";
  dark.style.display = "block";
  if (dark.style.display == "block") {
    container.classList.add("dark");
    dark.style.color = "white";
  }
}

function lightTheme() {
  dark.style.display = "none";
  light.style.display = "block";
  if (light.style.display == "block") {
    container.classList.remove("dark");
    light.style.color = "black";
  }
}
