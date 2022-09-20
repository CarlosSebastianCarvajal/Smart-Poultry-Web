let usuario = '';
$(document).on('click', '#btnIniciarSesion', function ()
{
    var correoL = $('#txtCorreo').val();
    usuario = correoL;
    var passL = $('#txtContrasenia').val();
    console.log(correoL+" - "+passL);
    $.ajax({
        url: 'SrvltLogin',
        method: 'POST',
        data: {
            CorreoL: correoL,
            PassL: passL
        },
        success: function(Validador) {
            if (Validador=='0') {
                alert("Datos incorrectos!");
                location.href='#';
            }else
            {
                $.ajax({
                    url: 'srvlt_NUsuario',
                    method:'POST',
                    data:{ CorreoU:correoL }
                    
                });
                if (Validador=='1') {
                    //alert('Usuario administrador');
                    
                    location.href = 'reporte_admin.jsp';
                    
                }else{
                    if (Validador=='2') {
                        location.href = 'reportes.jsp';
                    }
                }
            }
        }

    });
});