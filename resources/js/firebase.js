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
      sessionStorage.setItem("id", key);
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




export function extrerGalpones  (user) {
  const refUser = ref(db, 'Usuarios/' + user + '/galpones');
  onValue(refUser, (snapshot) => {
    snapshot.forEach((galpon) => {
      //const childKey = childSnapshot.key;
      const dataGalpon = galpon.val();
      console.log('NombreGalpon:'+dataGalpon.nombre);
      console.log('Dispositivo:'+dataGalpon.idDispositivo);
    });
  });
}