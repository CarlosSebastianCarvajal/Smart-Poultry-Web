import {addUser, getUser, updateUser, validateLogin, extrerRealTime, extrerAbastecimiento, extrerAbastecimientoFechaOption, extrerAbastecimientoOption} from './firebase.js';

const datoslist = document.querySelector('.post-list');
const ablist = document.querySelector('.tbody');
const btnSearch = document.querySelector('.btn');
var typeSelect = document.getElementById("typeSelect");

const startDate = document.getElementById('dpStart');
const endDate = document.getElementById('dpEnd');

var idGalpon = sessionStorage.getItem("idGalpon");
console.log(idGalpon);

extrerRealTime(idGalpon, datoslist);
extrerAbastecimiento(idGalpon, ablist);


btnSearch.addEventListener('click', (e) => {
    let searchButtonIsPressed = e.target.id == 'search';

    //SEARCH
    if(searchButtonIsPressed){
        var fechaInicial = startDate.value; 
        var fechaFinal = endDate.value;  
        var option = typeSelect.options[typeSelect.selectedIndex].value;
        if(fechaInicial.length == 10 && fechaFinal.length == 10){
            extrerAbastecimientoFechaOption(idGalpon, ablist, fechaInicial, fechaFinal, option);
        }else if (fechaInicial.length == 0 && fechaFinal.length == 0){
            extrerAbastecimientoOption(idGalpon, ablist, option);
        }else{
            alert('Ingrese Fecha Correctamente');
        }
        
    }
    
})

