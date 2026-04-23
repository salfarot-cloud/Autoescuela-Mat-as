// Lógica de la aplicación de autoescuela
class AutoescuelaApp {
  constructor(bancoPreguntas, NUM = 10) {
    this.bancoPreguntas = bancoPreguntas;
    this.NUM = NUM;
    this.preguntas = [];
    this.indice = 0;
    this.correctas = 0;
    this.respondida = false;

    // Referencias a elementos del DOM
    this.numeroPreguntaEl = document.getElementById("numero-pregunta");
    this.imagenPreguntaEl = document.getElementById("imagen-pregunta");
    this.textoPreguntaEl = document.getElementById("texto-pregunta");
    this.contenedorOpcionesEl = document.getElementById("contenedor-opciones");
    this.barraProgreso = document.getElementById("barra-progreso");
    this.resultadoBox = document.getElementById("resultado");
    this.textoResultado = document.getElementById("texto-resultado");
    this.badgeNivel = document.getElementById("badge-nivel");
    this.textoNivel = document.getElementById("texto-nivel");

    this.inicializarEventos();
  }

  inicializarEventos() {
    document.getElementById("btn-siguiente").onclick = () => this.siguientePregunta();
    document.getElementById("btn-reiniciar").onclick = () => this.iniciar();
  }

  barajar(arr) {
    return arr
      .map((v) => ({ v, o: Math.random() }))
      .sort((a, b) => a.o - b.o)
      .map((x) => x.v);
  }

  iniciar() {
    this.preguntas = this.barajar(this.bancoPreguntas).slice(0, this.NUM);
    this.indice = 0;
    this.correctas = 0;
    this.resultadoBox.style.display = "none";
    this.barraProgreso.style.width = "0%";
    this.cargarPregunta();
  }

  cargarPregunta() {
    const pregunta = this.preguntas[this.indice];
    this.numeroPreguntaEl.textContent = `Pregunta ${this.indice + 1} de ${this.NUM}`;
    this.imagenPreguntaEl.src = pregunta.imagen;
    this.imagenPreguntaEl.alt = `Imagen para la pregunta ${this.indice + 1}`;
    this.textoPreguntaEl.textContent = pregunta.texto;
    this.contenedorOpcionesEl.innerHTML = "";
    this.respondida = false;

    pregunta.opciones.forEach((opcion, i) => {
      const label = document.createElement("label");
      label.className = "option";
      label.innerHTML = `<input type="radio" name="r" />${opcion}`;

      label.onclick = () => this.seleccionarOpcion(i, pregunta);

      this.contenedorOpcionesEl.appendChild(label);
    });

    this.actualizarBarraProgreso();
  }

  seleccionarOpcion(indiceOpcion, pregunta) {
    if (this.respondida) return;
    this.respondida = true;

    const opciones = document.querySelectorAll(".option");
    opciones.forEach((label, idx) => {
      if (idx === pregunta.correcta) {
        label.classList.add("correct");
      }
      if (idx === indiceOpcion && idx !== pregunta.correcta) {
        label.classList.add("incorrect");
      }
    });

    if (indiceOpcion === pregunta.correcta) {
      this.correctas++;
    }
  }

  siguientePregunta() {
    if (!this.respondida) return;

    this.indice++;
    if (this.indice < this.NUM) {
      this.cargarPregunta();
    } else {
      this.finalizar();
    }
  }

  actualizarBarraProgreso() {
    this.barraProgreso.style.width = `${(this.indice / this.NUM) * 100}%`;
  }

  finalizar() {
    this.barraProgreso.style.width = "100%";
    this.contenedorOpcionesEl.innerHTML = "";
    this.textoPreguntaEl.textContent = "Examen completado";
    this.imagenPreguntaEl.style.display = "none";

    this.resultadoBox.style.display = "block";
    this.textoResultado.innerHTML = `Has acertado <strong>${this.correctas}</strong> de <strong>${this.NUM}</strong>.`;

    if (this.correctas <= 4) {
      this.badgeNivel.className = "badge badge-basic";
      this.badgeNivel.textContent = "Nivel básico";
      this.textoNivel.textContent = "Necesitas repasar un poco más.";
    } else if (this.correctas <= 8) {
      this.badgeNivel.className = "badge badge-mid";
      this.badgeNivel.textContent = "Nivel intermedio";
      this.textoNivel.textContent = "Buen trabajo, vas por buen camino.";
    } else {
      this.badgeNivel.className = "badge badge-advanced";
      this.badgeNivel.textContent = "Nivel avanzado";
      this.textoNivel.textContent = "Excelente, estás muy preparado.";
    }
  }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const app = new AutoescuelaApp(bancoPreguntas, 10);
  app.iniciar();
});
