const searchButton = document.getElementById("search-btn");
const overlay = document.getElementById("modal-overlay");
const searchName = document.getElementById("nome");
const searchYear = document.getElementById("ano");
const key = "66508f0";
function searchButtonClickHandler() {
  overlay.classList.add("open");

  const name = searchName.value.split(" ").join("+");
  const year = searchYear.value;
}

searchButton.addEventListener("click", searchButtonClickHandler);
