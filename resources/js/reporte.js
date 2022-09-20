import {addUser, getUser, updateUser, validateLogin, extrerGalpones} from './firebase.js';

  var id = sessionStorage.getItem("id");
  console.log(id);
  
  extrerGalpones(id);
  //console.log(nombre);

