import {addUser, getUser, updateUser, validateLogin, extrerRealTime, extrerAbastecimiento} from './firebase.js';

const datoslist = document.querySelector('.post-list');
const ablist = document.querySelector('.tbody');
var idGalpon = sessionStorage.getItem("idGalpon");
console.log(idGalpon);

extrerRealTime(idGalpon, datoslist);
extrerAbastecimiento(idGalpon, ablist);

