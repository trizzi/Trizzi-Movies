const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a35e61cd03c373d6f6f82fa36bf579b8&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=a35e61cd03c373d6f6f82fa36bf579b8&query="';
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementsByClassName('.search');

// Get initial Movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

const showMovies = (movies) => {
  main.innerHTMl = '';

  movies.forEach((movie) => {
    const { title, backdrop_path, vote_average, overview } =
      movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
            <img src="${
              IMG_PATH + backdrop_path
            }" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>overview</h3>
                <p>${overview}<p>
            </div>
        `;
    main.appendChild(movieEl);
  });
};

const getClassByRate = (vote) => {
  if (vote >= 8) {
    return 'white';
  } else if (vote >= 5) {
    return 'yellow';
  } else {
    return 'red';
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});
