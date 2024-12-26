const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", function () {
  const inputKeyword = document.querySelector("#input-keyword");
  fetch("http://www.omdbapi.com/?apikey=cd193474&s=" + inputKeyword.value).then(
    (response) =>
      response.json().then((response) => {
        const movies = response.Search.slice(0, 5);
        let cards = "";
        movies.forEach((m) => {
          cards += showCards(m);
        });
        const movieContainer = document.querySelector("#movie-container");
        movieContainer.innerHTML = cards;

        // After cards are shown, add event listeners for modal buttons
        const modalDetailButton = document.querySelectorAll(
          ".modal-detail-button"
        );
        modalDetailButton.forEach((btn) => {
          btn.addEventListener("click", function () {
            const imdbid = this.dataset.imdbid;
            fetch("http://www.omdbapi.com/?apikey=cd193474&i=" + imdbid)
              .then((response) => response.json())
              .then((m) => {
                const movieDetail = showDetailMovie(m);
                const modalBody = document.querySelector(".modal-body");
                modalBody.innerHTML = movieDetail;
                const modal = document.getElementById("small-modal");
                if (modal) {
                  modal.classList.remove("hidden"); // Show the modal
                }
              });
          });
        });
      })
  );
});

function showCards(m) {
  return `<div
          class="group relative w-32 h-96 rounded-3xl overflow-hidden hover:w-96 transition-all duration-700"
        >
          <div class="absolute inset-0 bg-black/50">
            <img
              src="${m.Poster}"
              alt="Movie Poster"
              class="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-700"
            />
          </div>

          <!-- Before hover text -->
          <div
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white transition-transform duration-700 group-hover:translate-y-[-50%] opacity-100 group-hover:opacity-0"
          >
            <h2 class="text-4xl font-bold teks-kebawah cursor-default"></h2>
          </div>

          <!-- After hover text -->
          <div
            class="absolute bottom-0 px-4 pb-8 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 max-w-72 z-10 opacity-0 group-hover:opacity-100"
          >
            <h4 class="text-md text-white capitalize">${m.Type}</h4>
            <h2 class="text-3xl font-bold">${m.Title}</h2>
            <p class="text-sm text-white mb-2">
            ${m.Year}
            </p>
            <button data-imdbid="${m.imdbID}" class="modal-detail-button px-4 py-1 rounded-full bg-pink-700 ">See More</button>
          </div>
        </div>`;
}

function showDetailMovie(m) {
  return `
<div class="bg-slate-800 rounded-lg p-6 shadow-lg text-center space-y-4">
  <img
    src="${m.Poster}"
    alt="${m.Title}"
    class="w-45 h-64 mx-auto rounded-lg border-4  "
  />
  <h2 class="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent transition duration-300">
    ${m.Title}
  </h2>
  <p class="text-sm text-white font-medium">
    <span class="text-pink-400">Year:</span> ${m.Year} | 
    <span class="text-pink-400">Runtime:</span> ${m.Runtime} | 
    <span class="text-pink-400">Rating:</span> ${m.Ratings[0].Value}
  </p>
  <p class="text-sm text-white">
    <span class="font-semibold text-pink-400">Plot:</span> ${m.Plot}
  </p>
  <p class="text-sm text-white">
    <span class="font-semibold text-pink-400">Rated:</span> ${m.Ratings[0].Value}
  </p>
  <p class="text-sm text-white">
    <span class="font-semibold text-pink-400">Awards:</span> ${m.Awards}
  </p>
</div>
  `;
}

// Add event listener to close modal
document.querySelectorAll("[data-modal-hide]").forEach((button) => {
  button.addEventListener("click", function () {
    const modalId = this.getAttribute("data-modal-hide");
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("hidden"); // Hide the modal
    }
  });
});
