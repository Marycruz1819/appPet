import { valida } from "./validaciones.js";

// va a regresar un arreglo q podemos iterar
const inputs = document.querySelectorAll("input");
inputs.forEach( input => {
    input.addEventListener("blur", (input) => {
        valida(input.target)
    });
});