import { arrPalabras } from "./data.js";

export const mensajeFallo = (text = "") => {
  if (text !== "") {
    document.getElementById("mensaje").innerHTML = `<h3>${text}</h3>`;
    return;
  }

  document.getElementById("mensaje").innerHTML = `<h3>${text}</h3>`;
};

export const hacerValidaciones = (palabra, letras, arrPalabrasUtilizadas) => {
  console.log(palabra);
  console.log(letras);
  if (!palabra.includes(letras)) {
    console.log("heee1");
    mensajeFallo("La palabra no inlcuye las letras");
    return false;
  }

  if (!arrPalabras.includes(palabra)) {
    console.log("heee2");
    mensajeFallo("La palabra no existe");
    return false;
  }

  if (arrPalabrasUtilizadas.includes(palabra)) {
    console.log("heee3");
    mensajeFallo("palabra ya fue utilizada");
    return false;
  }

  mensajeFallo("");
  return true;
};
