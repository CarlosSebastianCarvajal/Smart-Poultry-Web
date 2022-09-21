import {addUser, getUser, updateUser, validateLogin} from './firebase.js';
let usuario = '';
$(document).on('click', '#btnIniciarSesion', function ()
{
    var correoL = $('#txtCorreo').val();
    usuario = correoL;
    var passL = $('#txtContrasenia').val();
    console.log(correoL+" - "+passL);
    var validador = validateLogin(correoL, passL);
    //console.log(validador);
    //location.href=validador;

});
$(document).on('click', '#btnRegistrar', function ()
{
    var user = $('#txtNombreReg').val();
    var pass = $('#txtContraseniaReg').val();
    console.log(user+" - "+pass);
    addUser(user, pass);
});
