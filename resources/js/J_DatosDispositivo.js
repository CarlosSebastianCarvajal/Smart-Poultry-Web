$(document).ready(function () {
    $.ajax({
        url: 'Srvlt_DatosDispositivo',
        method: 'GET',
        success: function (val)
        {
            var strc_Data = "";
            console.log(val);
            var VarJSON = JSON.parse(val);

            for (var i = 0; i < VarJSON.length; i++) {
                strc_Data += '<tr><td>' + VarJSON[i].c1 + '</td>' +
                        ' <td> ' + VarJSON[i].c2 + ' </td>' +
                        ' <td> ' + VarJSON[i].c3 + ' </td>' +
                        ' <td>' + VarJSON[i].c4 + '</td></tr>';
            }
            $('#tbDatosDispositivo').append(strc_Data);
        }
    });
});