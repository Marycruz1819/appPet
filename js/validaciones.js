
/* /esto no hace el codigo tan reutilizable:
const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);

});*/
//esto si
export function valida (input){
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
     //subir esta accion al apdre para q se aplique a todas las divs
    //para saber si el campo rellenado es invalido y decirlo:
    if(input.validity.valid){
        //si es true quiero q quite la clase , q ponga la clase css para q represente q esta mal
        input.parentElement.classList.remove("input-container--invalid");
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

//3 crear una funcion para poder llamar a cada tipo de error sin tantos ifs :
const tipodeErrores = [
    "valeueMissing",
    "typeMismatch",
    "patternMissMatch",
    "customError",
];
const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido."
    },
    password: {
        valueMissing: "Este campo no  puede estar vacío",
        patternMissMatch: "Al menos 6 caracteres, maximo 12, debe contener al menos una mayuscula,una minuscula y un numero, no poner caracteres especiales",
    },
    nacimiento: {
        valueMissing: "El campo fecha no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad.",
    },
    numero: {
        valueMissing: "El campo de telefono no puede estar vacío",
        patternMissMatch: "El formato requerido es XXXXXXXXXX  10 numeros.",

    },
    direccion: {
        valueMissing: "El campo de dirección no puede estar vacío",
        patternMissMatch: "La dirección debe contener al menos 40 caracteres.",

    },
    ciudad: {
        valueMissing: "El campo de ciudad no puede estar vacío",
        patternMissMatch: "La dirección debe contener al menos 40 caracteres.",

    },
    estado: {
        valueMissing: "El campo de estado no puede estar vacío",
        patternMissMatch: "La dirección debe contener al menos 40 caracteres.",

    },
}

const validadores = {
    nacimiento: input=> validarNacimiento(input),
};

//3
function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ""
    tipodeErrores.forEach(error => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCFullDate()
        );
    return diferenciaFechas <= fechaActual;
}