/**
 * Orquestación Principal - Autoescuela Matías
 * 
 * Controlador que:
 * 1. Usa componentes puros (components.js) para generar HTML
 * 2. Usa modelo de datos (data.js) para obtener preguntas
 * 3. Maneja eventos del usuario
 * 4. Actualiza el DOM con HTML de componentes
 */

class AutoescuelaApp {
  /**
   * Inicializa la aplicación con referencias DOM
   * @param {Array<Object>} bancoPreguntas - Banco de preguntas de data.js
   * @param {number} totalPreguntas - Total de preguntas a mostrar
   */
  constructor(bancoPreguntas, totalPreguntas = 10) {
    this.bancoPreguntas = bancoPreguntas;
    this.totalPreguntas = totalPreguntas;
    
    // Estado
    this.preguntas = [];
    this.indiceActual = 0;
    this.respuestasCorrectas = 0;
    this.respondida = false;

    // Referencias a elementos del DOM
    this.elementosDOM = this.obtenerElementosDOM();

    // Inicializar event listeners
    this.inicializarEventos();
  }

  /**
   * Obtiene referencias a elementos del DOM
   * @private
   * @returns {Object} Objeto con referencias a elementos
   */
  obtenerElementosDOM() {
    return {
      contenedor: document.getElementById("app-container"),
      numeroPregunta: document.getElementById("numero-pregunta"),
      imagenPregunta: document.getElementById("imagen-pregunta"),
      textoPregunta: document.getElementById("texto-pregunta"),
      opcionesContenedor: document.getElementById("contenedor-opciones"),
      barraProgreso: document.getElementById("barra-progreso"),
      btnSiguiente: document.getElementById("btn-siguiente"),
      btnReiniciar: document.getElementById("btn-reiniciar"),
      resultadoBox: document.getElementById("resultado")
    };
  }

  /**
   * Inicializa event listeners
   * @private
   */
  inicializarEventos() {
    this.elementosDOM.btnSiguiente.addEventListener("click", () => this.siguientePregunta());
    this.elementosDOM.btnReiniciar.addEventListener("click", () => this.iniciar());
  }

  /**
   * Baraja un array usando algoritmo Fisher-Yates
   * @private
   * @param {Array} array - Array a barajar
   * @returns {Array} Array barajado
   */
  barajar(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  /**
   * Inicia un nuevo test
   */
  iniciar() {
    this.preguntas = this.barajar(this.bancoPreguntas).slice(0, this.totalPreguntas);
    this.indiceActual = 0;
    this.respuestasCorrectas = 0;
    this.respondida = false;
    
    // Ocultar resultados y mostrar primera pregunta
    this.elementosDOM.resultadoBox.style.display = "none";
    this.cargarPregunta();
  }

  /**
   * Carga la pregunta actual en pantalla
   * @private
   */
  cargarPregunta() {
    const pregunta = this.preguntas[this.indiceActual];
    const numeroMostrado = this.indiceActual + 1;

    // Actualizar número de pregunta
    this.elementosDOM.numeroPregunta.textContent = `Pregunta ${numeroMostrado} de ${this.totalPreguntas}`;

    // Actualizar imagen
    this.elementosDOM.imagenPregunta.src = pregunta.imagen;
    this.elementosDOM.imagenPregunta.alt = `Imagen para pregunta ${numeroMostrado}`;

    // Actualizar texto
    this.elementosDOM.textoPregunta.textContent = pregunta.texto;

    // Generar opciones con componente puro
    this.elementosDOM.opcionesContenedor.innerHTML = createOptionsList(pregunta.opciones);
    
    // Agregar event listeners a las opciones
    this.agregarEventosOpciones(pregunta);

    // Actualizar barra de progreso
    this.actualizarProgreso();

    // Reset de estado
    this.respondida = false;
    this.elementosDOM.btnSiguiente.disabled = true;
  }

  /**
   * Agrega event listeners a las opciones
   * @private
   * @param {Object} pregunta - Pregunta actual
   */
  agregarEventosOpciones(pregunta) {
    const opciones = document.querySelectorAll(".option");
    
    opciones.forEach((opcion, indice) => {
      opcion.addEventListener("click", () => {
        this.seleccionarOpcion(indice, pregunta);
      });
    });
  }

  /**
   * Maneja la selección de una opción
   * @private
   * @param {number} indiceSeleccionado - Índice de opción seleccionada
   * @param {Object} pregunta - Pregunta actual
   */
  seleccionarOpcion(indiceSeleccionado, pregunta) {
    if (this.respondida) return;
    
    this.respondida = true;
    const opciones = document.querySelectorAll(".option");

    // Mostrar resultado correcto/incorrecto
    opciones.forEach((opcion, indice) => {
      if (indice === pregunta.correcta) {
        opcion.classList.add("correct");
      }
      if (indice === indiceSeleccionado && indice !== pregunta.correcta) {
        opcion.classList.add("incorrect");
      }
    });

    // Contar respuesta correcta
    if (indiceSeleccionado === pregunta.correcta) {
      this.respuestasCorrectas++;
    }

    // Habilitar botón siguiente
    this.elementosDOM.btnSiguiente.disabled = false;
  }

  /**
   * Carga la siguiente pregunta
   * @private
   */
  siguientePregunta() {
    if (!this.respondida) return;

    this.indiceActual++;
    
    if (this.indiceActual < this.totalPreguntas) {
      this.cargarPregunta();
    } else {
      this.finalizarTest();
    }
  }

  /**
   * Actualiza la barra de progreso
   * @private
   */
  actualizarProgreso() {
    const porcentaje = ((this.indiceActual / this.totalPreguntas) * 100);
    this.elementosDOM.barraProgreso.style.width = `${porcentaje}%`;
  }

  /**
   * Finaliza el test y muestra resultados
   * @private
   */
  finalizarTest() {
    this.elementosDOM.barraProgreso.style.width = "100%";
    this.elementosDOM.opcionesContenedor.innerHTML = "";
    this.elementosDOM.textoPregunta.textContent = "Examen completado";
    this.elementosDOM.imagenPregunta.style.display = "none";

    // Generar tarjeta de resultados con componente puro
    const resultadoHTML = createResultCard(this.respuestasCorrectas, this.totalPreguntas);
    this.elementosDOM.resultadoBox.innerHTML = resultadoHTML;
    this.elementosDOM.resultadoBox.style.display = "block";

    // Deshabilitar botón siguiente
    this.elementosDOM.btnSiguiente.disabled = true;
  }
}

/**
 * Inicializa la aplicación cuando el DOM está listo
 */
document.addEventListener("DOMContentLoaded", () => {
  const config = getConfig();
  const banco = getBancoPreguntas();
  const app = new AutoescuelaApp(banco, config.PREGUNTAS_TEST);
  app.iniciar();
});
