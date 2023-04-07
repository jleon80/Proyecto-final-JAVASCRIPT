'use strict'

// my API Key 
const API_KEY = "1808892adc8c12f4d2e49b6d64b80a75";
// images base URL 
const BASE_URL_IMG = "https://image.tmdb.org/t/p/w500";
// image path to use as background-image in overviews 
const BASE_URL_BACKDROP = "https://image.tmdb.org/t/p/original";

//message when there is no search results
const noResults = (parameter) => {
  return `<section class="my-5 flex flex-col items-center justify-center">
        <div
          class="mb-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <span class="font-medium">Informacíon! :</span> No se han encontrado resultados para <span class="font-medium">${parameter}</span>
        </div>
      </section>`
}

// create a CARD with parameters
const createCard = (id, type, title, image, releaseDate) => {
  return `<article
  id="${id}" data-type="${type}" class="w-[250px] bg-gray-900 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105  mx-3 my-3 flex max-w-sm flex-col rounded-lg shadow-sm shadow-gray-800"
>
  <figure class="">
    <a href="">
      <img
        class="h-[375px] max-w-full rounded-t-lg"
        src="${image}"
        alt=""
      />
    </a>
  </figure>
  <div class=" rounded-b-lg bg-gray-900 px-2 py-2">
    <p class="mb-2 text-sm font-bold text-white">${title}</p>
    <p class="mb-1 text-sm text-gray-400">${releaseDate}</p>
    <div class="flex justify-around">
  <a href="overview.html?view=${id}&type=${type}"
    class="show-details rounded-full border border-[#e50914] px-4 py-1 text-center text-base text-[#e50914] hover:bg-[#e50914] hover:text-white focus:outline-none focus:ring-2 focus:ring-red-800 bg-gray-900">
    Detalles
  </a>
  <a href="#"
        class="add-favorites rounded-full border px-4 py-1 text-center text-base focus:outline-none focus:ring-4 border-gray-700 bg-gray-900 text-white hover:border-white focus:ring-gray-800">
        <i class="text-xl fa-solid fa-heart-circle-plus"></i> Favoritos
      </a>
  </div>    
  </div>
</article>`;
}

// create a CARD with parameters recoverd from local storage, and has a Delete button opcion
const createCardFavorites = (id, type, title, image, releaseDate) => {
  return `<article
  id="${id}" data-type="${type}" class="w-[250px] transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105  mx-3 my-3 flex max-w-sm flex-col rounded-lg shadow-sm shadow-gray-800"
>
  <figure class="">
    <a href="">
      <img
        class="h-[375px] max-w-full rounded-t-lg"
        src="${image}"
        alt=""
      />
    </a>
  </figure>
  <div class=" rounded-b-lg bg-gray-900 px-2 py-2">
    <p class="mb-2 text-sm font-bold text-white">${title}</p>
    <p class="mb-1 text-sm text-gray-400">${releaseDate}</p>
    <div class="flex justify-around">
  <a href="overview.html?view=${id}&type=${type}"
    class="show-details rounded-full border border-[#e50914] px-4 py-1 text-center text-base text-[#e50914] hover:bg-[#e50914] hover:text-white focus:outline-none focus:ring-2 focus:ring-red-800 bg-gray-900">
    Detalles
  </a>

  <a href="#"
        class="delete-favorite  rounded-full border px-4 py-1 text-center text-base focus:outline-none focus:ring-4 border-gray-700 bg-gray-900 text-white hover:border-white focus:ring-gray-800">
        <i class="text-xl fa-solid fa-heart-circle-minus"></i> Eliminar
      </a>
  </div>    
  </div>
</article>`;
}

// function to add a movie or serie to favorites 
const addToFavorites = (aTags) => {

  aTags.forEach(aTag => {
    aTag.addEventListener("click", e => {
      e.preventDefault();
      const parentElement = e.target.parentElement;
      const movieToSave = {};

      movieToSave.id = parentElement.parentNode.parentNode.getAttribute('id');
      movieToSave.type = parentElement.parentNode.parentNode.getAttribute('data-type');
      movieToSave.name = parentElement.parentNode.querySelectorAll("p")[0].innerText;
      movieToSave.releaseDate = parentElement.parentNode.querySelectorAll("p")[1].innerText;
      movieToSave.image = parentElement.parentNode.parentNode.querySelector('img').src
      localStorage.setItem(movieToSave.name, JSON.stringify(movieToSave));

    });
  });
}

export { API_KEY, BASE_URL_IMG, BASE_URL_BACKDROP, noResults, createCard, createCardFavorites, addToFavorites };
