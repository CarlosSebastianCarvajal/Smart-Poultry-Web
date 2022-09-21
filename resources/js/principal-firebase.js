import {addUser, getUser, updateUser, validateLogin, extrerGalpones} from './firebase.js';

const galponlist = document.querySelector('.post-list');

  var id = sessionStorage.getItem("idUser");
  sessionStorage.removeItem("idGalpon");
  console.log(id);
  
  extrerGalpones(id, galponlist);

  galponlist.addEventListener('click', (e) => {
    let viewButtonIsPressed = e.target.id == 'viewData';
    
    let idGalpon = e.target.parentElement.dataset.id;

    //VIEW REAL-TIME DATA
    if(viewButtonIsPressed){
      console.log(id);
      sessionStorage.setItem("idGalpon", idGalpon);
      location.href="realtime.html";
    }
  })
  //console.log(nombre);