// Get the current timestamp
var timestamp = Date.now();

// Create a new Date object using the timestamp
var date = new Date(timestamp);

// Extract the individual components of the date and time
var year = date.getFullYear();
var month = ('0' + (date.getMonth() + 1)).slice(-2);
var day = ('0' + date.getDate()).slice(-2);
var hours = ('0' + date.getHours()).slice(-2);
var minutes = ('0' + date.getMinutes()).slice(-2);
var seconds = ('0' + date.getSeconds()).slice(-2);

// Create the formatted string
var formattedDate = 'Fecha; '+  day + '/' + month + '/' + year + ', Hora; ' + hours + ':' + minutes+ ':' + seconds;
//TEST console.log(formattedDate)

//SET VALUES
document.querySelector('#id_id_paciente').value = document.querySelector('#pacientes').value;
document.querySelector('#id_timestamp').value = formattedDate;

// Ocultar campos
$(document).ready(function() {
  $('#id_id_paciente').hide(); 
  $('#id_id_fonoaudilogo').hide();
  $('#id_timestamp').hide();
});
//GET ELEMENT BY SELECT:
var selectR = document.getElementById("FORMULARIO-R-id").value;
var selectA1 = document.getElementById("FORMULARIO-A1-id").value;
var selectS = document.getElementById("FORMULARIO-S-id").value;
var selectA2 = document.getElementById("FORMULARIO-A2-id").value;
var selectT = document.getElementById("FORMULARIO-T-id").value;
var selectI = document.getElementById("FORMULARIO-I-id").value;


// Validar campos y evitar envío del formulario
var miFormulario = document.getElementById("mi-formulario");
miFormulario.addEventListener("submit", function(event) {
        // Prevenir el envío del formulario
    event.preventDefault();
    
        // Asignar valor de paciente seleccionado al campo id_id_paciente
    document.querySelector('#id_id_paciente').value = document.querySelector('#pacientes').value;
        // Enviar el formulario manualmente
    miFormulario.submit();
    // }

}); 