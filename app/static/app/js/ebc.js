// Verificar los campos al cargar la página y agregar eventos a los checkboxes
document.addEventListener("DOMContentLoaded", function () {

    //MODIFICAR CAMPOS
    //OBTENER ELEMENTOS POR ID
    // Obtener los elementos por su ID
    const p1 = $("#id_part1p1"); const p2 = $("#id_part1p2"); const p3 = $("#id_part1p3");
    const p4 = $("#id_part1p4"); const p5 = $("#id_part1p5"); const p6 = $("#id_part1p6");
    const p7 = $("#id_part1p7"); const p8 = $("#id_part1p8"); const p9 = $("#id_part1p9");
    const p10 = $("#id_part1p10"); const p11 = $("#id_part1p11"); const p12 = $("#id_part1p12");
    const p13 = $("#id_part1p13"); const p14 = $("#id_part1p14"); const p15 = $("#id_part1p15");
    const p16 = $("#id_part1p16"); const p17 = $("#id_part1p17"); const p18 = $("#id_part1p18");
    const p19 = $("#id_part1p19");

    // Setear elementos para que se conviertan en input:radio
    p1.attr("type", "radio"); p2.attr("type", "radio"); p3.attr("type", "radio"); p4.attr("type", "radio");
    p5.attr("type", "radio"); p6.attr("type", "radio"); p7.attr("type", "radio"); p8.attr("type", "radio");
    p9.attr("type", "radio"); p10.attr("type", "radio"); p11.attr("type", "radio"); p12.attr("type", "radio");
    p13.attr("type", "radio"); p14.attr("type", "radio"); p15.attr("type", "radio"); p16.attr("type", "radio");
    p17.attr("type", "radio"); p18.attr("type", "radio"); p19.attr("type", "radio");
    // Definir los datos de los campos y secciones
    const campos = [
        { checkbox: "part2p1", clase: "resp1" },
        { checkbox: "part2p7", clase: "resp2" },
        { checkbox: "part2p13", clase: "resp3" },
        { checkbox: "part2p19", clase: "resp4" },
        // Agrega aquí más campos y secciones si es necesario
    ];

    // Función para verificar los campos y mostrar u ocultar las secciones correspondientes
    function verificarCampos() {
        for (const campo of campos) {
            const checkbox = document.getElementsByName(campo.checkbox)[0];
            const elementos = document.getElementsByClassName(campo.clase);

            if (checkbox.checked) {
                for (const elemento of elementos) {
                    elemento.style.display = "table-cell";
                }
            } else {
                for (const elemento of elementos) {
                    elemento.style.display = "none";
                }
            }
        }
    }

    // Función para agregar eventos a los checkboxes
    function agregarEventosCheckboxes() {
        for (const campo of campos) {
            const checkbox = document.getElementsByName(campo.checkbox)[0];
            checkbox.addEventListener("change", verificarCampos);
        }
    }

    const campos1 = [
        { radio: "p2p4i", input: "p2p4es" },
        { radio: "p2p4p", input: "p2p4es" },
        { radio: "p2p4c", input: "p2p4es" },
        { radio: "p2p4o", input: "p2p4es" },
        { radio: "p2p10i", input: "p2p10es" },
        { radio: "p2p10p", input: "p2p10es" },
        { radio: "p2p10c", input: "p2p10es" },
        { radio: "p2p10o", input: "p2p10es" },
        { radio: "p2p16i", input: "p2p16es" },
        { radio: "p2p16p", input: "p2p16es" },
        { radio: "p2p16c", input: "p2p16es" },
        { radio: "p2p16o", input: "p2p16es" },
        { radio: "p2p22i", input: "p2p22es" },
        { radio: "p2p22p", input: "p2p22es" },
        { radio: "p2p22c", input: "p2p22es" },
        { radio: "p2p22o", input: "p2p22es" },
    ];

    function verificarCampos1() {
        for (const campo of campos1) {
            const radio = document.getElementById(campo.radio);
            const input = document.getElementById(campo.input);

            if (radio.checked && radio.value === "Otro" && radio.id === campo.radio) {
                input.disabled = false; // Habilitar el input
            } else if (!radio.checked || radio.value !== "Otro" || radio.id !== campo.radio) {
                input.value = ""; // Limpiar el valor del input
                input.disabled = true; // Deshabilitar el input
            }
        }
    }
    function agregarEventosCheckbox() {
        // Agregar evento de cambio a los radio buttons
        for (const campo of campos1) {
            const radio = document.getElementById(campo.radio);
            radio.addEventListener('change', verificarCampos1);
        }
    }

    // Llamar a la función verificarCampos1 para imprimir los valores chequeados inicialmente
    verificarCampos1();
    verificarCampos();
    agregarEventosCheckbox();
    agregarEventosCheckboxes();

    // DISPLAY ALFABETIZADO
});


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
}
//FUNCIONES CHECK
function checkchoice(preginicio, pregfinal, secc) {
    var hasCheckedField = false;
    var selectedValue = 0; // Variable para almacenar la suma de los valores seleccionados
    for (var i = preginicio; i <= pregfinal; i++) {
        var radioButtons = document.getElementsByName(`part${secc}p${i}`);
        var checked = false;
        for (var j = 0; j < radioButtons.length; j++) {
            if (setanalfab()) {
                if (i == 17 || i == 18) {
                    checked = true;
                    radioButtons[j].value = 0;
                    selectedValue += 0; // Sumar el valor seleccionado
                    break;
                } else {
                    if (radioButtons[j].checked) {
                        checked = true;
                        selectedValue += Number(radioButtons[j].value); // Sumar el valor seleccionado
                        break;
                    }
                }
            } else {
                if (radioButtons[j].checked) {
                    checked = true;
                    selectedValue += Number(radioButtons[j].value); // Sumar el valor seleccionado
                    break;
                }
            }
        }

        if (!checked) {
            alert("ERROR EN EL GRUPO DE INPUTS RADIO, EN PREGUNTA: " + i);
            hasCheckedField = true;
            break;
        }
    }

    if (!hasCheckedField) {
        return selectedValue; // Devolver la suma de los valores seleccionados
    } else {
        return null; // No se seleccionó ningún valor
    }
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
    if (!hasEmptyField) {
        return true;
    } else {
        return false;
    }
}
function bucleValueAnswer(secc, i, selectedValue) {
    var radioButtons = document.getElementsByName(`part${secc}p${i}`); //GET RADIOBUTTONS
    var checked = false;
    console.log('pregunta: ',i)
    for (var j = 0; j < radioButtons.length; j++) {
        if (setanalfab()) {
            if (secc == 3) {
                if (radioButtons[j].checked) {
                    checked = true;
                    selectedValue += Number(radioButtons[j].value); // Sumar el valor seleccionado
                    console.log('Seccion: ',secc);
                    console.log('Analfabeto? ',setanalfab());
                    console.log('total marcado: ', selectedValue);
                    break;
                }
            } else if(secc==1) {
                if (i == 17 || i == 18) {
                    checked = true;
                    radioButtons[j].value = 0;
                    selectedValue += 0; // Sumar el valor seleccionado
                    break;
                } else {
                    if (radioButtons[j].checked) {
                        checked = true;
                        selectedValue += Number(radioButtons[j].value); // Sumar el valor seleccionado
                        break;
                    }
                }
            }
        } else {
            if (radioButtons[j].checked) {
                checked = true;
                selectedValue += Number(radioButtons[j].value); // Sumar el valor seleccionado
                break;
            }
        }
    }
    return selectedValue;
}
function setAnswer(pregIni, pregFin, secc) {
    var selectedValue = Number(0);
    for (let i = pregIni; i <= pregFin; i++) {
        selectedValue = bucleValueAnswer(secc, i, selectedValue);
    }
    if (!setanalfab()) {

        if (secc == 3) {
            if (selectedValue >= 20) {
                return "Funcionalidad comunicativa normal.";
            }
            else if (selectedValue <= 19) {
                return "déficit de la funcionalidad comunicativa.";
            }
            else{
                return "Valor nulo, volver a hacer";
            }
        } else if (secc === 1) {
            if (selectedValue >= 19) {
                return "Actividad comunicativa normal.";
            }
            else if (selectedValue <= 18) {
                return "Déficit de actividad comunicativa.";
            }
            else{
                return "Valor nulo, volver a hacer";
            }
        }
    }
    else {
        if (secc == 1) {
            if (selectedValue >= 17) {
                return "Actividad comunicativa normal.";
            } else if (selectedValue <= 16) {
                return "Déficit de actividad comunicativa.";
            }
            else{
                return "Valor nulo, volver a hacer";
            }
        }        
        else if (secc == 3) {

            if (selectedValue >= 20) {
                return "Funcionalidad comunicativa normal.";
            }
            else if (selectedValue <= 19) {
                return "déficit de la funcionalidad comunicativa.";
            }
            else{
                return "Valor nulo, volver a hacer";
            }
        }
        else {
            return "No existe data para registrar"
        }
    }
}

//SET VALUES; 
function sumTotal() {
    return suma
}
function setanalfab() {
    let isanalfab = $('#RDA').prop('checked');

    if (isanalfab) {
        $('#dispAlfa1, #dispAlfa2').hide();
    } else {
        $('#dispAlfa1, #dispAlfa2').show();
    }
    return isanalfab;
}

function setpropervalue(secc, pregini, pregfin) {
    for (let i = pregini; i <= pregfin; i++) {
        var setpregunta = document.getElementsByName(`part${secc}p${i}`);
        var selectedOption = "";

        if (secc == 2) {
            if (setpregunta[0].type === "checkbox") {
                for (let j = 0; j < setpregunta.length; j++) {
                    if (setpregunta[j].checked) {
                        selectedOption = "SI";
                        break;
                    } else {
                        selectedOption = "NO";
                    }
                }
            } else if (setpregunta[0].type === "radio") {
                for (let j = 0; j < setpregunta.length; j++) {
                    if (setpregunta[j].checked) {
                        selectedOption = setpregunta[j].value;
                        break;
                    }
                }
            } else if (setpregunta[0].type === "text") {
                selectedOption = setpregunta[0].value;
            } else if (setpregunta[0].tagName === "textarea") {
                selectedOption = setpregunta[0].value;
            } else {
                selectedOption = "NO"
            }
            var inputField = document.getElementById(`id_part${secc}p${i}`);
            inputField.value = selectedOption;
        } else if (secc == 3) {
            // Manejar las preguntas de la sección 3
            if (setpregunta[0].type === "checkbox") {
                for (let j = 0; j < setpregunta.length; j++) {
                    if (setpregunta[j].checked) {
                        selectedOption = "SI";
                        break;
                    } else {
                        selectedOption = "NO";
                    }
                }
            } else if (setpregunta[0].type === "radio") {
                for (let j = 0; j < setpregunta.length; j++) {
                    if (setpregunta[j].checked) {
                        selectedOption = setpregunta[j].value;
                        break;
                    }
                }
            } else if (setpregunta[0].type === "text") {
                selectedOption = setpregunta[0].value;
            } else if (setpregunta[0].tagName === "textarea") {
                selectedOption = setpregunta[0].value;
            } else {
                selectedOption = "NO"
            }
            var inputField = document.getElementById(`id_part${secc}p${i}`);
            inputField.value = selectedOption;
        }
    }
}

function hideelements(secc, pregIni, pregFin) {
    for (let i = pregIni; i <= pregFin; i++) {
        $(`#id_part${secc}p${i}`).hide();

    }
}
// CUANDO EL DOCUMENTO ESTE LISTO:
$(document).ready(function () {
    //FUNCTION TO HIDE ELEMENTS SECT2
    hideelements(2, 1, 24);
    // OCULTAR CAMPOS 
    $('#id_id_paciente').hide();
    $('#id_id_fonoaudiologo').hide();
    $('#id_timestamp').hide();
    $('#id_part3Punt').hide();
    $('#id_opcfunconver1').hide();
    $('#id_opcfunconver2').hide();
    $('#id_opcfunconver3').hide();
    $('#id_opcfunconver4').hide();
    $('#id_totalEBC').hide();
    //ADD
    $('#id_pac_analfabeto').hide();
    $('#id_actComun').hide();
    $('#id_part2p1').hide();

    //REGISTRO DATOS
    $(".registro-datos").show();
    $(".registro-datos-btn").show();
    //FORM 1
    $(".form-part-1").hide();
    //PART 1
    $(".formEBC-part-1-1").hide();
    $(".formEBC-part-1-1-btn").hide();
    //PART 2
    $(".formEBC-part-1-2").hide();
    $(".formEBC-part-1-2-btn").hide();
    //FORM 2
    $(".form-part-2").hide();
    //FORM 3
    $(".form-part-3").hide();
    //BOTONES
    $("#cont-form-ebc-1").click(function () {
        if (checkfirstData() == true) {
            //REGISTRO DATOS
            $(".registro-datos").hide();
            $(".registro-datos-btn").hide();
            //FORM 1
            $(".form-part-1").show();
            //PART 1
            $(".formEBC-part-1-1").show();
            $(".formEBC-part-1-1-btn").show();
            //PART 2
            $(".formEBC-part-1-2").hide();
            $(".formEBC-part-1-2-btn").hide();
            //FORM 2
            $(".form-part-2").hide();
            //FORM 3
            $(".form-part-3").hide();
            scrollToTop();
        } else {
            scrollToTop();
        }
    })//FIN REGISTRO DATOS
    $("#cont-form-ebc-2").click(function () {
        if (checkchoice(1, 12, 1) != null) {
            //REGISTRO DATOS
            $(".registro-datos").hide();
            $(".registro-datos-btn").hide();
            //FORM 1
            $(".form-part-1").show();
            //PART 1
            $(".formEBC-part-1-1").hide();
            $(".formEBC-part-1-1-btn").hide();
            //PART 2
            $(".formEBC-part-1-2").show();
            $(".formEBC-part-1-2-btn").show();
            //FORM 2
            $(".form-part-2").hide();
            //FORM 3
            $(".form-part-3").hide();
            scrollToTop();
        } else {
            scrollToTop();
        }
    })//FIN PARTE 1(1-1)
    $("#cont-form-ebc-3").click(function () {
        setanalfab();
        if (checkchoice(13, 19, 1) != null) {

            //REGISTRO DATOS
            $(".registro-datos").hide();
            $(".registro-datos-btn").hide();
            //FORM 1
            $(".form-part-1").hide();
            //PART 1
            $(".formEBC-part-1-1").hide();
            $(".formEBC-part-1-1-btn").hide();
            //PART 2
            $(".formEBC-part-1-2").hide();
            $(".formEBC-part-1-2-btn").hide();
            //FORM 2
            $(".form-part-2").show();
            //FORM 3
            $(".form-part-3").hide();
            scrollToTop();
        } else {
            scrollToTop();
        }
    }) //FIN PARTE 1(1-2), 
    $("#cont-form-ebc-4").click(function () {

        setpropervalue(2, 1, 24);
        //REGISTRO DATOS
        $(".registro-datos").hide();
        $(".registro-datos-btn").hide();
        //FORM 1
        $(".form-part-1").hide();
        //PART 1
        $(".formEBC-part-1-1").hide();
        $(".formEBC-part-1-1-btn").hide();
        //PART 2
        $(".formEBC-part-1-2").hide();
        $(".formEBC-part-1-2-btn").hide();
        //FORM 2
        $(".form-part-2").hide();
        //FORM 3
        $(".form-part-3").show();
        scrollToTop
    })
    $("#cont-form-ebc-5").click(function () { //SUBMIT
        if (checkchoice(1, 20, 3) != null) {
            scrollToTop();
            const id_pac = document.querySelector('#id_id_paciente').value = document.querySelector('#pacientes').value;
            const setansw1 = setAnswer(1, 19, 1);
            const setansw2 = setAnswer(1, 20, 3);
            let part3punt = $('#id_part3Punt').value = setansw2;
            let actComuni = $('#id_actComun').value = setansw1;
            document.querySelector('#id_part3Punt').value = part3punt;
            document.querySelector('#id_actComun').value = actComuni;
            console.log(setansw2);
            // abc(setansw2, setansw1);
            
            function abc() {
                $('#id_opcfunconver1').value = $('#p2p4es').value;
                $('#id_opcfunconver2').value = $('#p2p10es').value;
                $('#id_opcfunconver3').value = $('#p2p16es').value;
                $('#id_opcfunconver4').value = $('#p2p22es').value;


                const miFormulario = document.getElementById("mi-formulario");
                if (miFormulario) {
                    miFormulario.addEventListener("submit", function (event) {
                        if (id_pac != ("" || null || false || " ") || actComun != ("" || null || false || " ") || part3Punt != ("" || null || false || " ")) {
                            miFormulario.submit();
                        } else {
                            event.preventDefault();
                            console.log("Id_paciente, actComun, part3Punt no relleno!");
                        }
                    });
                } else {
                    console.log("No existe formulario")
                }
            }
        }
    })
})