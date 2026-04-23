/**
 * Componentes Puros - Autoescuela Matías Campus 2026
 *
 * Todas las funciones son PURAS: reciben datos y devuelven strings de HTML.
 * NO modifican el DOM directamente. Sin efectos secundarios.
 */

/* ============================
   COMPONENTES DEL TEST
   ============================ */

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
 * Devuelve los textos para los badges de contador y tema.
 * @param {number} current - Índice actual (0-based)
 * @param {number} total - Total de preguntas
 * @returns {{ counter: string, topic: string }}
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

/* ============================
   COMPONENTES DEL TEMARIO
   ============================ */

/**
 * Crea el HTML de una tarjeta de tema del temario.
 * @param {Object} tema - Objeto con { t: título, d: descripción }
 * @param {number} index - Índice del tema
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

/* ============================
   COMPONENTES DE INICIO (HOME)
   ============================ */

/**
 * Crea el HTML de una tarjeta de estadística.
 * @param {Object} stat - Objeto con { valor, etiqueta }
 * @returns {string} HTML de la stat card
 */
function createStatCardHTML(stat) {
  return `
    <div class="stat-card">
      <div class="stat-value">${stat.valor}</div>
      <div class="stat-label">${stat.etiqueta}</div>
    </div>
  `;
}

/**
 * Crea el HTML de una tarjeta de servicio.
 * @param {Object} servicio - Objeto con { icono, titulo, desc }
 * @returns {string} HTML de la service card
 */
function createServicioCardHTML(servicio) {
  return `
    <div class="service-card">
      <div class="service-icon">${servicio.icono}</div>
      <div class="service-title">${servicio.titulo}</div>
      <div class="service-desc">${servicio.desc}</div>
    </div>
  `;
}

/**
 * Crea el HTML completo del panel de inicio.
 * @param {Object} info - Objeto de SCHOOL_INFO
 * @returns {string} HTML de la página de inicio
 */
function createHomeHTML(info) {
  const statsHTML = info.stats.map(createStatCardHTML).join('');
  const serviciosHTML = info.servicios.map(createServicioCardHTML).join('');

  return `
    <div class="home-hero">
      <div class="home-hero-badge">🚗 Campus 2026</div>
      <h2 class="home-hero-title">${info.nombre}</h2>
      <p class="home-hero-tagline">${info.tagline}</p>
      <p class="home-hero-desc">${info.descripcion}</p>
      <button class="home-cta-btn" id="home-cta-btn">Empezar test ahora →</button>
    </div>

    <div class="stats-grid">
      ${statsHTML}
    </div>

    <div class="section-heading">
      <h3 class="section-title">¿Por qué elegir Autoescuela Matías?</h3>
      <p class="section-subtitle">Todo lo que necesitas para aprobar en un solo lugar</p>
    </div>

    <div class="services-grid">
      ${serviciosHTML}
    </div>
  `;
}

/* ============================
   COMPONENTES DE LOCALIZACIÓN
   ============================ */

/**
 * Crea el HTML de un elemento de contacto.
 * @param {string} icono - Emoji icono
 * @param {string} label - Etiqueta del campo
 * @param {string} valor - Valor del campo
 * @returns {string} HTML de la contact card
 */
function createContactItemHTML(icono, label, valor) {
  return `
    <div class="contact-card">
      <div class="contact-icon">${icono}</div>
      <div class="contact-label">${label}</div>
      <div class="contact-value">${valor}</div>
    </div>
  `;
}

/**
 * Crea el HTML de una fila del horario.
 * @param {Object} item - Objeto con { dia, horas }
 * @returns {string} HTML de la fila
 */
function createHorarioRowHTML(item) {
  const cerrado = item.horas === 'Cerrado';
  return `
    <div class="horario-row ${cerrado ? 'horario-cerrado' : ''}">
      <span class="horario-dia">${item.dia}</span>
      <span class="horario-horas">${item.horas}</span>
    </div>
  `;
}

/**
 * Crea el HTML completo del panel de localización.
 * @param {Object} info - Objeto de SCHOOL_INFO
 * @returns {string} HTML de la página de localización
 */
function createLocalizacionHTML(info) {
  const { contacto } = info;
  const contactItems = [
    createContactItemHTML('📍', 'Dirección', contacto.direccion),
    createContactItemHTML('📞', 'Teléfono', contacto.telefono),
    createContactItemHTML('✉️', 'Email', contacto.email)
  ].join('');
  const horarioHTML = contacto.horario.map(createHorarioRowHTML).join('');

  return `
    <div class="localizacion-header">
      <h2 class="section-title">¿Dónde estamos?</h2>
      <p class="section-subtitle">Ven a vernos o contáctanos, estaremos encantados de atenderte</p>
    </div>

    <div class="contact-grid">
      ${contactItems}
    </div>

    <div class="map-container">
      <iframe
        title="Mapa Autoescuela Matías - Málaga"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-4.4514%2C36.7033%2C-4.4100%2C36.7280&layer=mapnik&marker=36.7167%2C-4.4307"
        allowfullscreen
        loading="lazy">
      </iframe>
    </div>

    <div class="horario-box">
      <div class="horario-title">🕐 Horario de atención</div>
      ${horarioHTML}
    </div>
  `;
}
