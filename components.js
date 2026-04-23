/**
 * Componentes Puros - Autoescuela Matías
 * 
 * Estos componentes devuelven strings HTML sin modificar el DOM.
 * Son funciones puras: mismo input = mismo output, sin efectos secundarios.
 */

/**
 * Crea el HTML de una tarjeta de pregunta
 * @param {Object} pregunta - Objeto con {texto, imagen, opciones, correcta}
 * @param {number} numero - Número de pregunta actual (1-10)
 * @returns {string} HTML de la pregunta
 */
function createQuestionCard(pregunta, numero) {
  return `
    <div class="question-box">
      <div class="question-number">Pregunta ${numero} de 10</div>
      <img 
        src="${pregunta.imagen}" 
        alt="Imagen para pregunta ${numero}" 
        class="question-image"
        loading="lazy"
      />
      <div class="question-text">${pregunta.texto}</div>
    </div>
  `;
}

/**
 * Crea el HTML de las opciones de respuesta
 * @param {Array<string>} opciones - Lista de opciones
 * @param {number} correcta - Índice de respuesta correcta
 * @returns {string} HTML con opciones
 */
function createOptionsList(opciones, correcta = null) {
  return opciones
    .map((opcion, indice) => `
      <label class="option" data-index="${indice}">
        <input type="radio" name="respuesta" value="${indice}" />
        <span>${opcion}</span>
      </label>
    `)
    .join('');
}

/**
 * Crea la barra de progreso
 * @param {number} actual - Pregunta actual (0-9)
 * @param {number} total - Total de preguntas
 * @returns {string} HTML de barra de progreso
 */
function createProgressBar(actual, total) {
  const porcentaje = ((actual / total) * 100).toFixed(0);
  return `
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${porcentaje}%"></div>
    </div>
  `;
}

/**
 * Crea la tarjeta de resultados finales
 * @param {number} correctas - Cantidad de respuestas correctas
 * @param {number} total - Total de preguntas
 * @returns {string} HTML de resultados
 */
function createResultCard(correctas, total) {
  let badgeClase = 'badge-basic';
  let badgeTexto = 'Nivel básico';
  let mensajeNivel = 'Necesitas repasar un poco más.';

  if (correctas > 8) {
    badgeClase = 'badge-advanced';
    badgeTexto = 'Nivel avanzado';
    mensajeNivel = 'Excelente, estás muy preparado.';
  } else if (correctas > 4) {
    badgeClase = 'badge-mid';
    badgeTexto = 'Nivel intermedio';
    mensajeNivel = 'Buen trabajo, vas por buen camino.';
  }

  return `
    <div class="result-box">
      <div id="texto-resultado">
        Has acertado <strong>${correctas}</strong> de <strong>${total}</strong>.
      </div>
      <div id="badge-nivel" class="badge ${badgeClase}">
        ${badgeTexto}
      </div>
      <div id="texto-nivel" style="margin-top: 6px;">
        ${mensajeNivel}
      </div>
    </div>
  `;
}

/**
 * Crea el botón "Siguiente"
 * @returns {string} HTML del botón
 */
function createNextButton() {
  return `
    <button class="btn btn-primary" id="btn-siguiente" disabled>
      Siguiente →
    </button>
  `;
}

/**
 * Crea el botón "Reiniciar"
 * @returns {string} HTML del botón
 */
function createRestartButton() {
  return `
    <button class="btn btn-ghost" id="btn-reiniciar">
      Reiniciar
    </button>
  `;
}

/**
 * Crea el contenedor de botones
 * @returns {string} HTML de botones
 */
function createButtonsContainer() {
  return `
    <div class="buttons-container">
      ${createRestartButton()}
      ${createNextButton()}
    </div>
  `;
}
