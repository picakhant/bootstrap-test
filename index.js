const showMeal = (categories) => {
  categories.forEach((element) => {
    const div = document.createElement("div");
    div.textContent = element.strCategory;
    document.body.append(div);
  });
};

const fetchingData = async () => {
  const api = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const { categories } = await api.json();
  showMeal(categories);
};

window.addEventListener("load", () => {
  fetchingData();
});
