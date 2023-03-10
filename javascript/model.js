import { persistencia } from "../storage.js";
import { hacerValidaciones } from "./helpers.js";

export class Game {
  constructor() {
    this.palabra = "";
    this.letras = "";
    this.tiempo = 5000;
    this.score = 0;
    this.arrPalabrasUtilizadas = [];
    this.temporizadorID = setTimeout(this.finalizarJuego, this.tiempo);

    //  =======================================================
    this.eventoEnter();
    this.actualizarLetra();
  }

  eventoEnter() {
    const inputPalabra = document.getElementById("palabra");
    inputPalabra.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.iniciarJuego();
      }
    });
  }

  generarLetrasRamdon = () => {
    const vocales = "aeiou";
    const consonantes = "qwrtypsdfghjklzxcvbnm";
    const priLet = consonantes[Math.floor(Math.random() * consonantes.length)];
    const segLet = vocales[Math.floor(Math.random() * vocales.length)];
    this.letras = priLet + segLet;
    return this.letras;
  };

  mostrarLetras = (letras) => {
    document.getElementById("letras").innerHTML = `<h2>${letras}</h2>`;
  };

  actualizarLetra() {
    this.mostrarLetras(this.generarLetrasRamdon());
  }

  resetearInput() {
    document.getElementById("palabra").value = "";
  }

  formatearValueInput() {
    this.palabra = document
      .getElementById("palabra")
      .value.toLowerCase()
      .trim();
  }

  finalizarJuego() {
    if (this.score > persistencia.getStorage("bestScore")) {
      persistencia.setStorage("bestScore", this.score);
    }
    persistencia.setStorage("currentScore", this.score);
    const URLactual = window.location.href;
    location.href = URLactual + "gameover.html";
  }

  reiniciarTemporizador() {
    clearTimeout(this.temporizadorID);
    this.temporizadorID = setTimeout(this.finalizarJuego, this.tiempo);
  }

  aceptarPalabra() {
    this.reiniciarTemporizador();
    this.record += 1;
    this.arrPalabrasUtilizadas.push(palabra);
    this.actualizarLetra();
  }

  iniciarJuego() {
    this.formatearValueInput();
    this.resetearInput();

    console.log(this.letras);
    if (
      hacerValidaciones(this.palabra, this.letras, this.arrPalabrasUtilizadas)
    ) {
      this.aceptarPalabra();
    }
  }
}
