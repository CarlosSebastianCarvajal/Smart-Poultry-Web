import {addUser, getUser, updateUser, validateLogin, extrerGalpones} from './firebase.js';

const galponlist = document.querySelector('.post-list');

  var id = sessionStorage.getItem("idUser");
  sessionStorage.removeItem("idGalpon");
  console.log(id);
  
  extrerGalpones(id, galponlist);

  galponlist.addEventListener('click', (e) => {
    let viewDataButtonIsPressed = e.target.id == 'viewData';
    let viewHisButtonIsPressed = e.target.id == 'viewHistory';
    
    let idGalpon = e.target.parentElement.dataset.id;

    //VIEW REAL-TIME DATA
    if(viewDataButtonIsPressed){
      console.log(id);
      sessionStorage.setItem("idGalpon", idGalpon);
      location.href="realtime.html";
    }
    // VIEW HISTORY DATA
    if(viewHisButtonIsPressed){
      sessionStorage.setItem("idGalpon", idGalpon);
      location.href="historial.html";
    }
  })
