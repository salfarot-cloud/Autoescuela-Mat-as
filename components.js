/**
 * Componentes Puros - Autoescuela Matías Campus 2026
 *
 * Todas las funciones son PURAS: reciben datos y devuelven strings de HTML.
 * NO modifican el DOM directamente. Sin efectos secundarios.
 */

/**
 * Crea el HTML de una opción de respuesta.
 * @param {string} texto - Texto de la opción
 * @param {number} index - Índice de la opción
 * @returns {string} HTML de la opción
 */
function createOptionHTML(texto, index) {
  return `<div class="option" data-index="${index}">${texto}</div>`;
}

/**
 * Crea el HTML de la lista completa de opciones.
 * @param {Array<string>} opts - Array de opciones de respuesta
 * @returns {string} HTML con todas las opciones
 */
function createOptionsListHTML(opts) {
  return opts.map((o, i) => createOptionHTML(o, i)).join('');
}

/**
 * Crea el HTML del cuadro de feedback/explicación.
 * @param {string} why - Texto de la explicación
 * @returns {string} HTML del feedback
 */
function createFeedbackHTML(why) {
  return `<strong>Explicación:</strong> ${why}`;
}

/**
 * Crea el HTML del contador de pregunta y tema.
 * @param {number} current - Índice actual (0-based)
 * @param {number} total - Total de preguntas
 * @returns {{ counter: string, topic: string }} Textos para los badges
 */
function createCounterText(current, total) {
  return {
    counter: `Pregunta ${current + 1} / ${total}`,
    topic: 'Tema: Manual B 2026'
  };
}

/**
 * Determina el nivel según el porcentaje de aciertos.
 * @param {number} scorePercent - Porcentaje de aciertos (0-100)
 * @returns {string} Nombre del nivel
 */
function getLevelText(scorePercent) {
  if (scorePercent <= 25) return 'Básico';
  if (scorePercent <= 60) return 'Medio';
  if (scorePercent <= 85) return 'Avanzado';
  return 'Experto';
}

/**
 * Crea el HTML de la caja de resultados finales.
 * @param {number} correctCount - Número de respuestas correctas
 * @param {number} total - Total de preguntas realizadas
 * @returns {string} HTML del bloque de resultados
 */
function createResultHTML(correctCount, total) {
  const percent = Math.round((correctCount / total) * 100);
  const level = getLevelText(percent);
  return `
    <div class="result-title">¡Test finalizado en Autoescuela Matías!</div>
    <div>Has acertado <strong>${correctCount}</strong> de <strong>${total}</strong> preguntas.</div>
    <div>Porcentaje de aciertos: <strong>${percent}%</strong>.</div>
    <div>Nivel obtenido: <strong>${level}</strong>.</div>
    <br>
    <button class="selector-btn restart-btn" style="padding:8px 14px;">Reiniciar test</button>
  `;
}

/**
 * Crea el HTML de una tarjeta de tema del temario.
 * @param {Object} tema - Objeto con { t: título, d: descripción }
 * @param {number} index - Índice del tema (para identificación)
 * @returns {string} HTML de la tarjeta
 */
function createTemarioCardHTML(tema, index) {
  return `
    <div class="card">
      <div class="card-header" data-card-index="${index}">
        <h3>${tema.t}</h3>
        <span class="card-toggle">+</span>
      </div>
      <div class="card-body">${tema.d.trim()}</div>
    </div>
  `;
}

/**
 * Crea el HTML completo del panel de temario.
 * @param {Array<Object>} manualData - Array de temas del manual
 * @returns {string} HTML de todas las tarjetas del temario
 */
function createTemarioHTML(manualData) {
  return manualData.map((m, i) => createTemarioCardHTML(m, i)).join('');
}
