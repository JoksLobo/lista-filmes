const searchButton = document.getElementById("search-btn");
const overlay = document.getElementById("modal-overlay");
const searchName = document.getElementById("nome");
const searchYear = document.getElementById("ano");
const key = "66508f0";
const movieListContainer = document.getElementById("movie-list");

let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

async function searchButtonClickHandler() {
  try {
    let url = `https://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}&y=${movieYearParameterGenerator()}`;

    const responde = await fetch(url);
    const data = await responde.json();
    if (data.Error) {
      throw new Error("Filme não encontrado!");
    }
    createModal(data);
    overlay.classList.add("open");
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

function addToList(movieObject) {
  movieList.push(movieObject);
}

function isMovieAlreadyInList(id) {
  function doesThisIdBelongToTheMovie(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(movieList.find(doesThisIdBelongToTheMovie));
}

function updadeUi(movieObject) {
  movieListContainer.innerHTML += `<article id="movie-card${movieObject.imdbID}">
          <img
            src="${movieObject.Poster}"
            alt="Poster de ${movieObject.Title}"
          />
          <button onclick="removeMovieFromList('${movieObject.imdbID}')" id="remove-btn"><i class="bi bi-trash"></i> Remover</button>
        </article>`;
}

function removeMovieFromList(id) {
  notie.confirm({
    text: "Deseja remover o filme de sua lista?",
    submitText: "Sim",
    cancelText: "Não",
    position: "top",
    submitCallback: function remove() {
      movieList = movieList.filter((movie) => movie.imdbID !== id);
      document.getElementById(`movie-card${id}`).remove();
      updateLocalStorage();
    },
  });
}

function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
  updadeUi(movieInfo);
}

searchButton.addEventListener("click", searchButtonClickHandler);
