import {addUser, getUser, updateUser, validateLogin, extrerRealTime, extrerAbastecimiento, extrerAbastecimientoFechaOption, extrerAbastecimientoOption} from './firebase.js';

const datoslist = document.querySelector('.post-list');
const ablist = document.querySelector('.tbody');
const btnSearch = document.querySelector('.btn');
var typeSelect = document.getElementById("typeSelect");

const textoFecha = document.getElementById('datepicker');

var idGalpon = sessionStorage.getItem("idGalpon");
console.log(idGalpon);

extrerRealTime(idGalpon, datoslist);
extrerAbastecimiento(idGalpon, ablist);

btnSearch.addEventListener('click', (e) => {
    let searchButtonIsPressed = e.target.id == 'search';

    //SEARCH
    if(searchButtonIsPressed){
        var fecha = textoFecha.value; 
        var option = typeSelect.options[typeSelect.selectedIndex].value;
        if(fecha.length == 10){

            extrerAbastecimientoFechaOption(idGalpon, ablist, fecha, option);
        }else if (fecha.length == 0){
            extrerAbastecimientoOption(idGalpon, ablist, option);
        }else{
            alert('Ingrese Fecha Correctamente');
        }
        
    }
    
})

