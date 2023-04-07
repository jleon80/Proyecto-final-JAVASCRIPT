"use strict";

import { API_KEY, BASE_URL_IMG, noResults, createCard, addToFavorites } from "./modulo_funciones.js";

window.document.addEventListener("DOMContentLoaded", function () {

  const queryString = location.search;
  const queryStringObj = new URLSearchParams(queryString);
  const searchQuery = queryStringObj.get('search');

  const endpointSearchMulti = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`

  fetch(endpointSearchMulti)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      // if no results show a message with noREsults function
      if (data.results.length === 0) {
        document.querySelector('.info-container').innerHTML = noResults(searchQuery);
      }

      console.log(data.results)
      let cardsMovies = "";
      let cardsSeries = "";
      let counterMovies = 0;
      let counterSeries = 0;


      const containermovies = document.querySelector("#container-movies");
      const containerSeries = document.querySelector("#container-series");

      data.results.forEach((movie) => {

        // media_type == movie or tv

        if (movie.media_type == 'movie' && movie.backdrop_path !== null) {
          const { id, title, poster_path, release_date } = movie;

          cardsMovies += createCard(id, 'movie', title, BASE_URL_IMG + poster_path, release_date);
          counterMovies++;
        }

        if (movie.media_type == 'tv' && movie.backdrop_path !== null) {
          const { id, name, poster_path, first_air_date } = movie;
          cardsSeries += createCard(id, 'tv', name, BASE_URL_IMG + poster_path, first_air_date);
          counterSeries++;
        }

      });

      // to update the results counters 
      document.querySelector('.search-counter-total').innerHTML = ` - ${searchQuery} ( ${counterMovies + counterSeries} )`;
      document.querySelector('.search-counter-movies').innerHTML = `( ${counterMovies} )`;
      document.querySelector('.search-counter-series').innerHTML = `( ${counterSeries} )`;

      containermovies.innerHTML = cardsMovies;
      containerSeries.innerHTML = cardsSeries;

      // call a funtion to add a movie/serie to favorites in local storage 
      const allATags = document.querySelectorAll(".add-favorites");
      addToFavorites(allATags);

    })

    .catch(function (error) {
      console.log("Error: " + error);
    });


});