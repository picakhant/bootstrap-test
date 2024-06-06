const parma = new URLSearchParams(location.search);
const id = parma.get("id");

const showMeals = (meals) => {
  const section = document.getElementById("section");
  meals.forEach((meal) => {
    const col = document.createElement("div");
    col.classList.add("col-8", "col-md-6", "col-lg-4", "p-3", "mx-auto");

    col.innerHTML = `
    <div class="card h-100">
            <img
              src="${meal.strMealThumb}"
              class="card-img-top object-fit-contain"
              alt="img"
              style="height: 300px"
            />
            <div class="card-body">
              <h5 class="card-title text-center">${meal.strMeal}</h5>
              <a href="#" class="btn btn-primary d-block mx-auto">Learn More...</a>
            </div>
          </div>
    
    `;

    section.append(col);
  });
};

const showLoading = (isLoading) => {
  const navbar = document.getElementById("navbar");
  const section = document.getElementById("section");

  section.innerHTML = "";

  if (isLoading) {
    navbar.style.display = "none";
    section.innerHTML = `
    <div
    class="col-12 d-flex justify-content-center align-items-center vh-100"
  >
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
    `;

    return;
  }

  navbar.style.display = "flex";
};

const fetchData = async () => {
  try {
    showLoading(true);
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
    );

    const { meals } = await api.json();
    showLoading(false);
    showMeals(meals);
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", () => {
  fetchData();
});
