const showCategories = (categories) => {
  const section = document.getElementById("section");

  categories.forEach((category) => {
    const col3 = document.createElement("div");
    col3.classList.add(
      "col-10",
      "col-md-4",
      "col-lg-3",
      "p-2",
      "mx-auto",
      "m-lg-0"
    );

    col3.innerHTML = `
  <div class="card h-100">
  <img
    src="${category.strCategoryThumb}"
    class="card-img-top"
    alt="Img"
  />
  <div class="card-body">
    <h3 class="card-title">${category.strCategory}</h3>
    <p class="card-text">
      ${category.strCategoryDescription.substr(0, 100)}
    </p>
  </div>
</div>
  
  `;

    const card = col3.querySelectorAll(".card");
    const catogoryCard = card[0];

    catogoryCard.addEventListener("click", () => {
      location.href = `../pages/Menu.html?id=${category.strCategory}`;
    });

    section.append(col3);
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

const fetchingData = async () => {
  try {
    //show loading
    showLoading(true);

    const api = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const { categories } = await api.json();

    showLoading(false);

    showCategories(categories);
  } catch (err) {
    if (err) alert("Server Err");
  }
};

window.addEventListener("load", () => {
  fetchingData();
});
