"use strict";


import { API_KEY, BASE_URL_IMG, BASE_URL_BACKDROP } from "./modulo_funciones.js";

window.document.addEventListener("DOMContentLoaded", function () {

  const queryString = location.search;
  const queryStringObj = new URLSearchParams(queryString);
  const searchQuery = queryStringObj.get('view');//movie or serie Id
  const searchType = queryStringObj.get('type');//type of content, "movie" or "tv"

  // the endpoint has 3 parameters to get information from API about a specific movie or tv
  const endpointDetails = `https://api.themoviedb.org/3/${searchType}/${searchQuery}?api_key=${API_KEY}&language=es,en`

  fetch(endpointDetails)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      searchType == 'movie' ? document.querySelector(".title").innerHTML = data.title : document.querySelector(".title").innerHTML = data.name
      document.querySelector(".poster-image ").src = BASE_URL_IMG + data.poster_path;
      document.querySelector('.overview-text').innerHTML = data.overview;
      searchType == 'movie' ? document.querySelector('.release-date-text').innerHTML = data.release_date : document.querySelector('.release-date-text').innerHTML = data.first_air_date

      if (searchType == 'movie') {
        document.querySelector('.seasons-duration').innerHTML = `Duración : ${data.runtime} min`
      } else {
        console.log(data.number_of_seasons)
        document.querySelector('.seasons-duration').innerHTML = `Temporadas : ${data.number_of_seasons}`
        document.querySelector('.episodes').innerHTML = `Episodios : ${data.number_of_episodes}`;
      }

      data.genres.forEach(genre => {
        const listGenres = document.querySelector('.genres-text');
        let newElement = document.createElement("li");
        newElement.textContent = genre.name;
        listGenres.appendChild(newElement)
      });

      let imageBackdropPath = `url(${BASE_URL_BACKDROP + data.backdrop_path})`;
      const imageBackdrop = document.querySelector('.container-overview');
      imageBackdrop.style.backgroundImage = imageBackdropPath;
      imageBackdrop.style.backgroundSize = 'cover';
      // imageBackdrop.style.opacity = '0.2';

      // to add this movie/serie to favorites in local storage 
      const addToFavoritesBtn = document.querySelector('.add-favorites');
      addToFavoritesBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // save to favorites depending on media type "movie" or "tv"
        if (searchType == 'movie') {
          const movieToSave = { id: data.id, type: 'movie', name: data.title, releaseDate: data.release_date, image: BASE_URL_IMG + data.poster_path };
          localStorage.setItem(movieToSave.name, JSON.stringify(movieToSave));
        } else {
          const movieToSave = { id: data.id, type: 'tv', name: data.name, releaseDate: data.data.first_air_date, image: BASE_URL_IMG + data.poster_path };
          localStorage.setItem(movieToSave.name, JSON.stringify(movieToSave));
        }


      });

      // to play on youtube this movie/serie
      const playTrailer = document.querySelector('.play-trailer');
      const modalWindow = document.querySelector('#modal-window');

      playTrailer.addEventListener('click', (e) => {
        e.preventDefault();

        modalWindow.style.display = "flex";
        //to show youtube player on modal window
        const endpointTrailer = `https://api.themoviedb.org/3/${searchType}/${searchQuery}/videos?api_key=${API_KEY}&language=es,en`

        getTrilerUrlVideo(endpointTrailer);

      });

      const closeWindow = document.querySelector('.close-window');
      closeWindow.addEventListener('click', () => {
        modalWindow.style.display = "none";
      })


      const modal = document.querySelector('#modal-window')
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

    })

    .catch(function (error) {
      console.log("Error: " + error);
    });

  //get the youtube video url from API, and show youtube player on the modal window 
  function getTrilerUrlVideo(endpointTrailer) {
    let videoID = '';
    fetch(endpointTrailer)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data.results)
        data.results.forEach(element => {

          // return only the first element of videos. It has not been implemented to be able to see more videos yet
          if (element.type == 'Trailer') {
            // console.log(element.key)
            videoID = element.key
          }
        });

        const iframeYoutube = `<iframe width="838" height="470" src="https://www.youtube.com/embed/${videoID}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;

        document.querySelector('.youtube-iframe').innerHTML = iframeYoutube;
      })
      .catch(function (error) {
        console.log("Error: " + error);
      });
  }

});
