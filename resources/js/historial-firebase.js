import {extraerHistory, extraerHistoryFilter} from './firebase.js';

var idGalpon = sessionStorage.getItem("idGalpon");
console.log(idGalpon);

const hislist = document.querySelector('.tbody');
const btnFilter = document.querySelector('.btn');

const startDate = document.getElementById('dpStart');
const endDate = document.getElementById('dpEnd');

extraerHistory(idGalpon, hislist);





btnFilter.addEventListener('click', (e) => {
    let filterButtonIsPressed = e.target.id == 'filter';

    //SEARCH
    if(filterButtonIsPressed){
        var fechaInicial = startDate.value; 
        var fechaFinal = endDate.value; 
        console.log("Filtrar");
        if(fechaInicial.length == 10 && fechaFinal.length == 10){
            // Extraer entre rangos de fecha
            extraerHistoryFilter(idGalpon, hislist, fechaInicial, fechaFinal);
        }else if (fechaInicial.length == 0 && fechaFinal.length == 0){
            extraerHistory(idGalpon, hislist);
        }else{
            alert('Ingrese Fecha Correctamente');
        }
        
    }
    
})