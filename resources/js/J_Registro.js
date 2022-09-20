$(document).on('click', '#btnRegistrar', function ()
{
    var nombreR = $('#txtNombreReg').val();
    var correoR = $('#txtCorreoReg').val();
    var passInR1 = $('#txtContraseniaReg').val();
    var datos =
            {
                NomR: nombreR,
                CorR: correoR,
                PssR: passInR1
            };
    if (nombreR.length > 0 && correoR.length > 0 && passInR1.length > 0) {
        $.ajax
                ({
                    url: 'srvltRegistroUser',
                    method: 'POST',
                    data: datos,
                    success: function ()
                    {
                        alert('Registro exitoso');
                        $('#txtNombreReg').val('');
                        $('#txtCorreoReg').val('');
                        $('#txtContraseniaReg').val('');
                        location.href('login.jsp');
                    }
                });
    } else
    {
        alert('Llene los campos');
    }
});