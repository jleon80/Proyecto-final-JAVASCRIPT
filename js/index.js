"use strict";


import { API_KEY, BASE_URL_IMG, createCard, addToFavorites } from "./modulo_funciones.js";

window.document.addEventListener("DOMContentLoaded", function () {

  const endpointMoviesTopWeek = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
  const endpointSeriesTopWeek = `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`;
  const endpintMoviesPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  //-----Cargar peliculas populares en index.html
  // endPoint = API endpoint 
  // container = Container where the content  will be displayed
  // typeOfContent = movie "true" / serie "false"
  // callbackAddToFavorites call a function wich add a movie or serie to favorites 
  function connectToAPI(endPoint, container, typeOfContent, callbackAddToFavorites) {

    fetch(endPoint)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        let cards = "";
        console.log(data.results)
        data.results.forEach((movieSerie) => {
          if (typeOfContent) {
            const { id, title, poster_path, release_date } = movieSerie;
            cards += createCard(id, 'movie', title, BASE_URL_IMG + poster_path, release_date);

          } else {
            const { id, name, poster_path, first_air_date } = movieSerie;
            cards += createCard(id, 'tv', name, BASE_URL_IMG + poster_path, first_air_date);

          }
        });

        container.innerHTML = cards;

        // call a callback funtion to add a movie/serie to favorites in local storage 
        const allATagsFavorites = document.querySelectorAll(".add-favorites");
        callbackAddToFavorites(allATagsFavorites);

      })

      .catch(function (error) {
        console.log("Error: " + error);
      });

  }

  const moviesPopularWeek = document.querySelector("#container-movies-week");
  const seriesPopular = document.querySelector("#container-series-week");
  const moviesPopular = document.querySelector("#container-movies-popular");
  // call this function to show top week movies 
  connectToAPI(endpointMoviesTopWeek, moviesPopularWeek, true, addToFavorites);
  // call this function to show popular series
  connectToAPI(endpointSeriesTopWeek, seriesPopular, false, addToFavorites);
  // call this function to show popular movies
  connectToAPI(endpintMoviesPopular, moviesPopular, true, addToFavorites);


  //-----button  to go to top on scroll-----
  let mybutton = document.getElementById("goToTop");
  mybutton.addEventListener("click", () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  });

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
});
