const searchButton = document.getElementById("search-btn");
const overlay = document.getElementById("modal-overlay");
const searchName = document.getElementById("nome");
const searchYear = document.getElementById("ano");
const key = "66508f0";
async function searchButtonClickHandler() {
  try {
    overlay.classList.add("open");

    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}&y=${movieYearParameterGenerator()}`;

    const responde = await fetch(url);
    const data = await responde.json();
    if (data.Error) {
      throw new Error("Filme não encontrado!");
    }
    console.log(data);
  } catch (error) {
    notie.alert({ type: "error", text: error.message, time: 2 });
  }
}

function movieNameParameterGenerator() {
  if (searchName.value === "") {
    throw new Error("Insira um filme");
  }
  return searchName.value.split(" ").join("+");
}

function movieYearParameterGenerator() {
  if (searchYear.value === "") {
    return "";
  }
  if (searchYear.value.length !== 4 || Number.isNaN(Number(searchYear.value))) {
    throw new Error("Insira um ano válido");
  }
  return searchYear.value;
}

searchButton.addEventListener("click", searchButtonClickHandler);
