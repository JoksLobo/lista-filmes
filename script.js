const searchButton = document.getElementById("search-btn");
const overlay = document.getElementById("modal-overlay");
const searchName = document.getElementById("nome");
const searchYear = document.getElementById("ano");
const key = "66508f0";
async function searchButtonClickHandler() {
  overlay.classList.add("open");

  const name = searchName.value.split(" ").join("+");
  const year = searchYear.value;
  let url = `http://www.omdbapi.com/?apikey=${key}&t=${name}&y=${year}`;

  const responde = await fetch(url);
  const data = await responde.json();
  console.log(data);
}

searchButton.addEventListener("click", searchButtonClickHandler);
