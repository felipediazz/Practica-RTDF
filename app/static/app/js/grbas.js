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
document.querySelector('#id_id_paciente').value = document.querySelector('#pacientes').value
document.querySelector('#id_timestamp').value = formattedDate;

// Ocultar campos
$(document).ready(function() {
  $('#id_id_paciente').hide(); 
  $('#id_id_fonoaudilogo').hide();
  $('#id_timestamp').hide();
  $('.sortable').DataTable();
});

// Validar campos y evitar envío del formulario
var miFormulario = document.getElementById("mi-formulario");
miFormulario.addEventListener("submit", function(event) {
  // Prevenir el envío del formulario
  event.preventDefault();
  
  // Obtener valores de los selects
  var selectG = document.getElementById("id_G").value;
  var selectR = document.getElementById("id_R").value;
  var selectB = document.getElementById("id_B").value;
  var selectA = document.getElementById("id_A").value;
  var selectS = document.getElementById("id_S").value;
  
  // Comprobar que los selects tengan un valor seleccionado
  if (selectG == "null" || selectR == "null" || selectB == "null" || selectA == "null" || selectS == "null") {
    var errorMessage = document.querySelector('#error-message');
    errorMessage.innerHTML = 'Debe seleccionar un valor para todos los campos';  
  } else {
    // Asignar valor de paciente seleccionado al campo id_id_paciente
    document.querySelector('#id_id_paciente').value = document.querySelector('#pacientes').value;
    // Enviar el formulario manualmente
    miFormulario.submit();
  }
});
