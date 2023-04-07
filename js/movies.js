"use strict";


import { API_KEY, BASE_URL_IMG, createCard, addToFavorites } from "./modulo_funciones.js";

window.document.addEventListener("DOMContentLoaded", function () {

  const endpintMoviesPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  //-----Cargar peliculas populares en index.html
  // endPoint = API endpoint 
  // container = Container where the content  will be displayed
  // callbackAddToFavorites call a function wich add a movie or serie to favorites 
  function connectToAPI(endPoint, container, callbackAddToFavorites) {

    fetch(endPoint)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        let cards = "";
        console.log(data.results)
        data.results.forEach((movie) => {

          const { id, title, poster_path, release_date } = movie;
          cards += createCard(id, 'movie', title, BASE_URL_IMG + poster_path, release_date);

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


  const moviesPopular = document.querySelector("#container-movies-popular");
  // to show popular movies
  connectToAPI(endpintMoviesPopular, moviesPopular, addToFavorites);


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
