"use strict";

import { createCardFavorites } from "./modulo_funciones.js";

document.addEventListener("DOMContentLoaded", function () {

  //Show my favorites from local Storage    
  const contenedorFavorites = document.querySelector("#main-container");
  let cards = "";

  const loadContentFromStorage = () => {

    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      const movieObject = JSON.parse([key] = value);

      console.log(movieObject);

      cards += createCardFavorites(movieObject.id, movieObject.type, movieObject.name, movieObject.image, movieObject.releaseDate)

    }
    // show the number of storaged movies 
    document.querySelector('.title-container').innerHTML = `Películas y series favoritas ( ${localStorage.length} )`;
    // render favorite movies on the main container 
    contenedorFavorites.innerHTML = cards;
    cards = '';
  }

  loadContentFromStorage();

  // button to delete all favorites 
  const bntDeleteAll = document.querySelector('.btn-delete-all');
  bntDeleteAll.addEventListener('click', () => {
    if (localStorage.length > 0) {
      localStorage.clear();
      document.querySelector('.title-container').innerHTML = 'Películas Favoritas ( 0 )';
      contenedorFavorites.innerHTML = '';
    }
  })

  // to delete a selected card from favorites 
  function deleteCardFunction() {

    const btnDeleteOne = document.querySelectorAll('.delete-favorite');
    btnDeleteOne.forEach(element => {
      element.addEventListener('click', e => {
        e.preventDefault();
        const parentElement = e.target.parentElement;
        localStorage.removeItem(parentElement.parentNode.querySelectorAll("p")[0].innerText);
        // update the content
        document.querySelector('.title-container').innerHTML = `Películas Favoritas ( ${localStorage.length} )`;
        loadContentFromStorage();
        // recursive recall to update all elements inside  "btnDeleteOne"
        deleteCardFunction();
      })
    });
  }

  deleteCardFunction();

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

