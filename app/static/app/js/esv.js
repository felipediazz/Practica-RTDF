// FUNCTION TO CHECK SELECT FORMS
function checkSelect(pregini, pregfin, secform) {
    var hasEmptyField = false;
    for (var i = pregini; i <= pregfin; i++) {
        if (document.querySelector('#Pregunta-' + i).value === "") {
            alert("ERROR EN EL GRUPO DE SELECCION, CON POSICION: " + i);
            hasEmptyField = true;
            break;
        } else if (document.querySelector('#Pregunta-' + i).value === "null") {
            alert("ERROR EN EL GRUPO DE SELECCION, CON POSICION: " + i);
            hasEmptyField = true;
            break;
        }
    }
    var buttonform1 = document.querySelector("#Form-esv-" + secform);
    if (!hasEmptyField) {
        buttonform1.disabled = hasEmptyField;
        return !hasEmptyField;
    } else {
        buttonform1.disabled = true;
        return false;
    }
}
function sumandsetlimit(pregini, pregfin) {
    var sum = 0;
    for (var i = pregini; i <= pregfin; i++) {
        typenumber = Number(document.querySelector('#Pregunta-' + i).value);
        if (i == 1 || i == 2 || i == 4 || i == 5 || i == 6 || i == 8 || i == 9 || i == 14 || i == 16 || i == 17 || i == 20 || i == 23 || i == 24 || i == 25 || i == 27) {
            // console.log("pregunta: "+i+" Con valor: "+typenumber)
            sum += typenumber;
        }
    }
    console.log("Limites: " + sum);
    return sum
}
function sumandsetemotion(pregini, pregfin) {
    var sum = 0;
    for (var i = pregini; i <= pregfin; i++) {
        typenumber = Number(document.querySelector('#Pregunta-' + i).value);
        if (i == 10 || i == 13 || i == 15 || i == 18 || i == 21 || i == 28 || i == 29 || i == 30) {
            sum += typenumber;
            // console.log("pregunta: "+i+" Con valor: "+typenumber)
        }
    }
    console.log("Emociones " + sum);
    return sum
}
function sumandsetfisical(pregini, pregfin) {
    var sum = 0;
    for (var i = pregini; i <= pregfin; i++) {
        typenumber = Number(document.querySelector('#Pregunta-' + i).value);

        if (i == 3 || i == 7 || i == 11 || i == 12 || i == 19 || i == 22 || i == 26) {
            sum += typenumber;
            // console.log("pregunta: "+i+" Con valor: "+typenumber)
        }
    }
    console.log("fisico  " + sum);
    return sum
}
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
}
function checkfirstData() {
    var hasEmptyField = false;
    if (document.querySelector('#pacientes').value === "") {
        alert("ERROR, tienes que tener un dato seleccionado en el Select de Pacientes.")
        hasEmptyField = true;
    } else if (document.querySelector('#pacientes').value === "null") {
        alert("ERROR, tienes que tener un dato seleccionado en el Select de Pacientes.")
        hasEmptyField = true;
    }
    // var buttonContinue=document.querySelector("#cont-form-esv-1");
    if (!hasEmptyField) {
        // buttonContinue.disabled = false;
        // console.log(hasEmptyField);
        return true;
    } else {
        // buttonContinue.disabled = true;
        // console.log(hasEmptyField);

        return false;
    }
}
function checkdateData() {
    var inputFecha = document.querySelector('#id_fechanac');
    var fechaSeleccionada = inputFecha.value;

    // Validar si la fecha está vacía o es nula
    if (!fechaSeleccionada) {
        alert("ERROR: Debes seleccionar una fecha de nacimiento.");
        return false;
    }
    // Obtener la fecha actual
    var fechaActual = Date.now();
    dateObj = new Date(fechaActual)
    // Extract the individual components of the date and time
    var year = dateObj.getFullYear();
    var month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    var day = ('0' + dateObj.getDate()).slice(-2);
    // Format the date to YYYY-MM-DD
    var fechaActual = year + '-' + month + '-' + day;
    // Format the date to (YYYY-100)-MM-DD
    var fechaMaximaperm = (year - 100) + '-' + month + '-' + day;
    // Obtener la fecha mínima y máxima permitida
    var fechaMinima = fechaMaximaperm;
    var fechaMaxima = fechaActual;

    // Convertir la fecha seleccionada a objeto Date
    var fechaSeleccionadaObj = new Date(fechaSeleccionada);
    var year1 = fechaSeleccionadaObj.getFullYear();
    var month1 = ('0' + (fechaSeleccionadaObj.getMonth() + 1)).slice(-2);
    var day1 = ('0' + fechaSeleccionadaObj.getDate()).slice(-2);
    var fechaSeleccionadaObj = year1 + '-' + month1 + '-' + day1

    if (fechaSeleccionadaObj < fechaMinima || fechaSeleccionadaObj > fechaMaxima) {
        alert("ERROR: La fecha de nacimiento debe estar entre el " + fechaMinima + " y el " + fechaMaxima + ".");
        console.log(fechaSeleccionadaObj);
        return false;
    } else {
        console.log(fechaSeleccionadaObj);
    }

    // Validar otras condiciones si es necesario
    // ...

    return true;
}

//Create miFormulario and set Values to FORMULARIO
var miFormulario = document.getElementById("mi-formulario");
$(function () {
    //SET VALUES    
    $("#btnRegistro").prop("disabled", true);
    //HIDE CAMPS
    $('#id_id_paciente').hide();
    $('#id_id_fonoaudiologo').hide();
    $('#id_totalESV').removeAttr('required').hide();
    $('#id_limitacion').removeAttr('required').hide();
    $('#id_fisico').removeAttr('required').hide();
    $('#id_emocional').removeAttr('required').hide();

    //Check select input filled
    //BUTTONS AND CLICKS

    //BUTTON BACK
    $("#volver-a-0").click(function () {

        $("#Form-esv-1").hide();
        $(".formulario-esv-1").hide();
        $("#registro-datos").show();
        $(".registro-datos").show();
        $("#Form-esv-2").hide();
        $(".formulario-esv-2").hide();
        $("#Form-esv-3").hide();
        $(".formulario-esv-3").hide();

    })
    //BUTTON BACK
    $("#volver-a-1").click(function () {

        $("#Form-esv-1").show();
        $(".formulario-esv-1").show();
        $("#registro-datos").hide();
        $(".registro-datos").hide();
        $("#Form-esv-2").hide();
        $(".formulario-esv-2").hide();
        $("#Form-esv-3").hide();
        $(".formulario-esv-3").hide();
    })
    //BUTTON BACK
    $("#volver-a-2").click(function () {

        $("#Form-esv-1").hide();
        $(".formulario-esv-1").hide();
        $("#registro-datos").hide();
        $(".registro-datos").hide();
        $("#Form-esv-2").show();
        $(".formulario-esv-2").show();
        $("#Form-esv-3").hide();
        $(".formulario-esv-3").hide();
    })
    //BUTTON CONTINUE FORM 1
    $("#cont-form-esv-1").click(function () {
        // console.log(checkfirstData());
        if (checkfirstData()) {
            $("#Form-esv-1").show();
            $(".formulario-esv-1").show();
            $("#registro-datos").hide();
            $(".registro-datos").hide();
            $("#Form-esv-2").hide();
            $(".formulario-esv-2").hide();
            $("#Form-esv-3").hide();
            $(".formulario-esv-3").hide();
            scrollToTop();
        } else {
            console.log('ERROR en el sector de registro datos');
            scrollToTop();
        }
    });
    //BUTTON CONTINUE TO FORM 2
    $("#cont-form-esv-2").click(function () {

        if (checkSelect(1, 10, 1) && checkdateData()) {
            $("#Form-esv-1").hide();
            $(".formulario-esv-1").hide();
            $("#registro-datos").hide();
            $(".registro-datos").hide();
            $("#Form-esv-2").show();
            $(".formulario-esv-2").show();
            $("#Form-esv-3").hide();
            $(".formulario-esv-3").hide();
            scrollToTop();
        } else {
            console.log('ERROR en el sector 1');
            scrollToTop();
        }
    });
    //BUTTON CONTINUE TO FORM 3
    $("#cont-form-esv-3").click(function () {
        if (checkSelect(11, 20, 2)) {

            $("#Form-esv-1").hide();
            $(".formulario-esv-1").hide();
            $("#registro-datos").hide();
            $(".registro-datos").hide();
            $("#Form-esv-2").hide();
            $(".formulario-esv-2").hide();
            $("#Form-esv-3").show();
            $(".formulario-esv-3").show();
            scrollToTop();
        } else {
            console.log("ERROR en el sector 2");
            scrollToTop();
        }
    });
    $("#TEST").click(function () {

        document.querySelector('#id_id_paciente').value = document.querySelector('#pacientes').value;
        var limitacion = sumandsetlimit(1, 30);
        var fisico = sumandsetfisical(1, 30);
        var emocion = sumandsetemotion(1, 30);
        // console.log(document.querySelector('#id_id_paciente').value)
        document.querySelector('#id_totalESV').value = limitacion + fisico + emocion;
        document.querySelector('#id_limitacion').value = limitacion;
        document.querySelector('#id_fisico').value = fisico;
        document.querySelector('#id_emocional').value = emocion;

        if (checkSelect(21, 30, 3)) {
            var miFormulario = document.getElementById("mi-formulario");
            if (miFormulario) {
                miFormulario.addEventListener("submit", function (event) {
                    // Asegura asignar los valor ocultos del paciente seleccionado

                    if (document.querySelector('#id_limitacion').value == "" || document.querySelector('#id_fisico').value == "" || document.querySelector('#id_emocional').value == "") {
                        // Prevenir el envío del formulario

                    } else {
                        document.querySelector('#id_id_paciente').value = document.querySelector('#pacientes').value;
                        // Enviar el formulario manualmente
                        miFormulario.submit();
                    }
                });
            }
        } else {
            console.log("NOTFULL, NOT ABLE");
        }
    });
    //BUTTON submit and check values:

    //END BUTTONS AND CLICK
});



