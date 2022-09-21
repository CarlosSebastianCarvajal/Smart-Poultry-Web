// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getDatabase, ref, onValue, set, child, push, update } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOP4-50hdwWbDL4HCyAI3sMX97yX6fTx8",
  authDomain: "smart-poultry-6a61c.firebaseapp.com",
  databaseURL: "https://smart-poultry-6a61c-default-rtdb.firebaseio.com",
  projectId: "smart-poultry-6a61c",
  storageBucket: "smart-poultry-6a61c.appspot.com",
  messagingSenderId: "651768456908",
  appId: "1:651768456908:web:6b37822241ff19ca8c4469"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Inicializar la base de datos
const db = getDatabase();
const nameRef = ref(db, 'Usuarios/' + 'dcapurrov' + '/galpones');

export const saveTask = (title, description) => {
  console.log(nameRef);
  
}

// Generar numero aleatorio
var d = new Date();
var t = d.getTime();
var counter = t;

const refUsers = ref(db, 'Usuarios/');
export const getUser = (user, pass) => {
  onValue(refUsers, (snapshot) => {
    var data = snapshot.val();
    console.log(data);
    console.log(data[user]);
    console.log(data[user].clave);
  });
}

export const addUser = (user, pass) => {
  //Generar key para el usuario nuevo
  //const newUserkey = push(child(ref(db), 'Usuarios')).key;
  set(ref(db, 'Usuarios/' + user), { 
    clave: pass,
    tipo: 'C',
    usuario: user
  });
}
export const updateUser = (email, name, pass) => {
  
  var newUserkey = push(child(ref(db), 'Usuarios')).key;
  newUserkey = '1663168718370';
  console.log(newUserkey);
  const postData = { 
    apellidos: '',
    ci: '',
    clave: pass,
    idDispositivo: '',
    nombres: name,
    tipo: '',
    usuario: email 
  };
  const updates = {};
  updates['Usuarios/' + newUserkey] = postData;
  return update(ref(db), updates);
}

export function validateLogin  (user, pass) {
  const refUser = ref(db, 'Usuarios/' + user);
  onValue(refUser, (snapshot) => {
    var data = snapshot.val();
    if(data != null){ 
    if(data.usuario == user && data.clave == pass){
      console.log('Login correcto');
      const key = snapshot.key;
      sessionStorage.setItem("nombres", data.nombres); 
      sessionStorage.setItem("apellidos", data.apellidos); 
      sessionStorage.setItem("idUser", key);
      location.href="principal.html";
      //return 'reportes.html';
    } else {
      console.log('Login incorrecto');
      return '#';
    }
    } else {
      console.log('Usuario no existe');
      return '#';
    }
  });
}




export function extrerGalpones  (user, galponlist) {
  const refUser = ref(db, 'Usuarios/' + user + '/galpones');
  
  onValue(refUser, (snapshot) => {
    let output = ``;
    galponlist.innerHTML = output;
    snapshot.forEach((galpon) => {
      //const childKey = childSnapshot.key;
      const dataGalpon = galpon.val();
      output += `
        <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body" data-id=${dataGalpon.idDispositivo}>
                      <h5 class="card-title">${dataGalpon.nombre}</h5>
                      <img src="resources/img/shed.png" width="100" height="80" style="float:left">
                      <p class="card-text" style="float:right;">${dataGalpon.descripcion}</p>
                      <br/><br/>
                      <a href="#" class="btn btn-primary" id="viewData" style="float:right;">Real Time Data</a>
                      <a href="#" class="btn btn-secondary" id="viewHistory" style="float:right;">History Data</a>
                    </div>
                  </div>
                </div>`;
      console.log('NombreGalpon:'+dataGalpon.nombre);
      console.log('Dispositivo:'+dataGalpon.idDispositivo);
      console.log('Dispositivo:'+dataGalpon.descripcion);
    });
    galponlist.innerHTML = output;
  });
}

export function extrerRealTime  (idGalpon, datoslist) {
  const refDis = ref(db, 'Dispositivos/' + idGalpon + '/Datos/Tiempo-Real');
  
  onValue(refDis, (snapshot) => {
    var dataRealTime = snapshot.val();
    let output = ``;
    datoslist.innerHTML = output;
    //TEMPERATURA
    console.log('TEMPERATURA:'+ dataRealTime.Temperatura);
    output += `
        <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">TEMPERATURE</h4>
                      <img src="resources/img/Temperature.png" width="50" height="80" style="float:left">
                      <h4 class="card-text">   ${dataRealTime.Temperatura}°C</h4>
                    </div>
                  </div>
                </div>`;

    //HUMEDAD
    console.log('HUMEDAD:'+ dataRealTime.Humedad);
    output += `
        <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">HUMIDITY</h4>
                      <img src="resources/img/humidity.png" width="80" height="80" style="float:left">
                      <h4 class="card-text">   ${dataRealTime.Humedad}%</h4>
                    </div>
                  </div>
                </div>`;

    //NIVEL COMIDA
    console.log('NIVEL COMIDA:'+ dataRealTime.nComida);
    output += `
        <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">LEVEL OF FOOD</h4>
                      <img src="resources/img/level-of-food.png" width="80" height="80" style="float:left">
                      <h4 class="card-text">  ${dataRealTime.nComida}%</h4>
                    </div>
                  </div>
                </div>`;

    //NIVEL AGUA
    console.log('NIVEL AGUA:'+ dataRealTime.nAgua);
    output += `
        <div class="col-sm-6">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">LEVEL OF WATER</h4>
                      <img src="resources/img/level-of-temperature.png" width="80" height="80" style="float:left">
                      <h4 class="card-text">   ${dataRealTime.nAgua}%</h4>
                    </div>
                  </div>
                </div>`;

    
    datoslist.innerHTML = output;
  });
}


export function extrerAbastecimiento  (idGalpon, ablist) {
  const refDis = ref(db, 'Dispositivos/' + idGalpon + '/Datos/Abastecimiento');
  
  onValue(refDis, (snapshot) => {
    let idx = 1;
    let output = ``;
    ablist.innerHTML = output;
    let fecha = [];
    let hora = [];
    let tipo = [];
    snapshot.forEach((abastecimiento) => {
      //const childKey = childSnapshot.key;
      const dataAb = abastecimiento.val();
      /*output += `
        <tr>
          <th class="tr-num">${idx}</th>
          <td class="tr-fecha">${dataAb.Fecha}</td>
          <td class="tr-hora">${dataAb.Hora}</td>
          <td class="tr-tipo">${dataAb.Tipo}</td>
        </tr>
      `;*/
      fecha.unshift(dataAb.Fecha);
      hora.unshift(dataAb.Hora);
      tipo.unshift(dataAb.Tipo);
      //idx = idx + 1;
    });

    for(let i = 0; i<fecha.length; i++){
      output += `
        <tr>
          <th class="tr-num">${idx}</th>
          <td class="tr-fecha">${fecha[i]}</td>
          <td class="tr-hora">${hora[i]}</td>
          <td class="tr-tipo">${tipo[i]}</td>
        </tr>
      `;
      idx = idx + 1;
    }
    
    ablist.innerHTML = output;
  });
}


export function extrerAbastecimientoFechaOption  (idGalpon, ablist, _fecha, option) {
  const refDis = ref(db, 'Dispositivos/' + idGalpon + '/Datos/Abastecimiento');
  
  onValue(refDis, (snapshot) => {
    let idx = 1;
    let output = ``;
    ablist.innerHTML = output;
    let fecha = [];
    let hora = [];
    let tipo = [];
    snapshot.forEach((abastecimiento) => {
      //const childKey = childSnapshot.key;
      const dataAb = abastecimiento.val();
      if(dataAb.Fecha == _fecha){
        if(option == "All"){
          fecha.unshift(dataAb.Fecha);
          hora.unshift(dataAb.Hora);
          tipo.unshift(dataAb.Tipo); 
        }else{
          if(option == dataAb.Tipo){
            fecha.unshift(dataAb.Fecha);
            hora.unshift(dataAb.Hora);
            tipo.unshift(dataAb.Tipo); 
          }
        }
      }
    });

    for(let i = 0; i<fecha.length; i++){
      output += `
        <tr>
          <th class="tr-num">${idx}</th>
          <td class="tr-fecha">${fecha[i]}</td>
          <td class="tr-hora">${hora[i]}</td>
          <td class="tr-tipo">${tipo[i]}</td>
        </tr>
      `;
      idx = idx + 1;
    }
    
    ablist.innerHTML = output;
  });
}

export function extrerAbastecimientoOption  (idGalpon, ablist, option) {
  const refDis = ref(db, 'Dispositivos/' + idGalpon + '/Datos/Abastecimiento');
  
  onValue(refDis, (snapshot) => {
    let idx = 1;
    let output = ``;
    ablist.innerHTML = output;
    let fecha = [];
    let hora = [];
    let tipo = [];
    snapshot.forEach((abastecimiento) => {
      //const childKey = childSnapshot.key;
      const dataAb = abastecimiento.val();
      if(option == "All"){
        fecha.unshift(dataAb.Fecha);
        hora.unshift(dataAb.Hora);
        tipo.unshift(dataAb.Tipo); 
      }else{
        if(option == dataAb.Tipo){
          fecha.unshift(dataAb.Fecha);
          hora.unshift(dataAb.Hora);
          tipo.unshift(dataAb.Tipo); 
        }
      }
    });

    for(let i = 0; i<fecha.length; i++){
      output += `
        <tr>
          <th class="tr-num">${idx}</th>
          <td class="tr-fecha">${fecha[i]}</td>
          <td class="tr-hora">${hora[i]}</td>
          <td class="tr-tipo">${tipo[i]}</td>
        </tr>
      `;
      idx = idx + 1;
    }
    
    ablist.innerHTML = output;
  });
}