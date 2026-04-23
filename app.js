/**
 * Orquestación Principal - Autoescuela Matías Campus 2026
 *
 * Controlador que:
 * 1. Usa componentes puros (components.js) para generar HTML
 * 2. Usa modelo de datos (data.js) para obtener preguntas, temario e info de la escuela
 * 3. Maneja todos los eventos del usuario
 * 4. Actualiza el DOM con el HTML generado por los componentes
 */

/* ============================
   ESTADO DE LA APLICACIÓN
   ============================ */

let selectedQuestions = [];
let currentIndex = 0;
let busy = false;
let totalQuestions = 0;
let correctCount = 0;

/* ============================
   NAVEGACIÓN ENTRE PANELES
   ============================ */

/**
 * Muestra el panel indicado y marca el botón de navegación como activo.
 * @param {string} id - ID del panel a mostrar
 * @param {HTMLElement} btn - Botón de navegación pulsado
 */
function showPage(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

/* ============================
   LÓGICA DEL TEST
   ============================ */

/**
 * Baraja un array usando el algoritmo Fisher-Yates.
 * @param {Array} arr - Array a barajar
 * @returns {Array} Nuevo array barajado
 */
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Inicia el test con el número de preguntas seleccionado.
 * @param {number} n - Número de preguntas a realizar
 */
function setQuestionCount(n) {
  document.querySelectorAll('.selector-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim() === String(n));
  });

  const shuffled = shuffleArray(getQuizBank());
  totalQuestions = Math.min(n, shuffled.length);
  selectedQuestions = shuffled.slice(0, totalQuestions);
  currentIndex = 0;
  correctCount = 0;

  document.getElementById('result-box').style.display = 'none';
  document.getElementById('selector-box').style.display = 'flex';
  document.getElementById('options-title').style.display = 'block';

  loadQuestion();
}

/**
 * Carga y renderiza la pregunta actual.
 * Usa createOptionsListHTML() para generar las opciones.
 */
function loadQuestion() {
  if (!selectedQuestions.length) return;
  busy = false;

  const data = selectedQuestions[currentIndex];

  const img = document.getElementById('main-img');
  img.src = data.img;
  img.onerror = () => {
    img.src = 'https://placehold.co/800x600/ffb6c1/ffffff?text=Autoescuela+Matias';
  };

  document.getElementById('q-txt').innerText = data.q;

  const { counter, topic } = createCounterText(currentIndex, totalQuestions);
  document.getElementById('question-counter').textContent = counter;
  document.getElementById('question-topic').textContent = topic;

  document.getElementById('feedback').style.display = 'none';
  document.getElementById('feedback').innerHTML = '';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('result-box').style.display = 'none';

  const optionsBox = document.getElementById('options-box');
  optionsBox.innerHTML = createOptionsListHTML(data.opts);

  optionsBox.querySelectorAll('.option').forEach((el, i) => {
    el.addEventListener('click', () => handleOptionClick(i, data, optionsBox));
  });
}

/**
 * Maneja el click en una opción de respuesta.
 * @param {number} selected - Índice de la opción seleccionada
 * @param {Object} data - Objeto de la pregunta actual
 * @param {HTMLElement} optionsBox - Contenedor de opciones
 */
function handleOptionClick(selected, data, optionsBox) {
  if (busy) return;
  busy = true;

  const options = optionsBox.querySelectorAll('.option');
  if (selected === data.ans) {
    options[selected].classList.add('correct');
    correctCount++;
  } else {
    options[selected].classList.add('incorrect');
    options[data.ans].classList.add('correct');
  }

  const feedbackEl = document.getElementById('feedback');
  feedbackEl.innerHTML = createFeedbackHTML(data.why);
  feedbackEl.style.display = 'block';
  document.getElementById('next-btn').style.display = 'inline-flex';
}

/**
 * Avanza a la siguiente pregunta o finaliza el test.
 */
function nextQuestion() {
  currentIndex++;
  if (currentIndex < totalQuestions) {
    loadQuestion();
  } else {
    showResult();
  }
}

/**
 * Muestra el resultado final usando createResultHTML().
 */
function showResult() {
  const resultBox = document.getElementById('result-box');
  resultBox.innerHTML = createResultHTML(correctCount, totalQuestions);
  resultBox.style.display = 'block';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('feedback').style.display = 'none';
  resultBox.querySelector('.restart-btn').addEventListener('click', restartTest);
}

/**
 * Reinicia el test volviendo al estado de selección.
 */
function restartTest() {
  document.getElementById('q-txt').innerText = 'Selecciona cuántas preguntas quieres para empezar un nuevo test.';
  document.getElementById('options-box').innerHTML = '';
  document.getElementById('feedback').style.display = 'none';
  document.getElementById('result-box').style.display = 'none';
  document.getElementById('options-title').style.display = 'none';
  document.getElementById('question-counter').textContent = 'Pregunta 0 / 0';
  document.getElementById('question-topic').textContent = 'Tema: —';
  document.getElementById('selector-box').style.display = 'flex';
  document.querySelectorAll('.selector-btn').forEach(b => b.classList.remove('active'));
}

/* ============================
   TEMARIO
   ============================ */

/**
 * Renderiza el temario usando createTemarioHTML() y adjunta eventos de acordeón.
 */
function initTemario() {
  const grid = document.getElementById('topic-grid');
  grid.innerHTML = createTemarioHTML(getManualData());

  grid.querySelectorAll('.card-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const toggle = header.querySelector('.card-toggle');
      const isVisible = body.style.display === 'block';
      body.style.display = isVisible ? 'none' : 'block';
      toggle.textContent = isVisible ? '+' : '−';
    });
  });
}

/* ============================
   INICIO (HOME)
   ============================ */

/**
 * Renderiza la página de inicio usando createHomeHTML() y adjunta el evento del CTA.
 */
function initHome() {
  const container = document.getElementById('home-content');
  container.innerHTML = createHomeHTML(getSchoolInfo());

  container.querySelector('#home-cta-btn').addEventListener('click', () => {
    showPage('test', document.getElementById('nav-test'));
  });
}

/* ============================
   LOCALIZACIÓN
   ============================ */

/**
 * Renderiza la página de localización usando createLocalizacionHTML().
 */
function initLocalizacion() {
  const container = document.getElementById('localizacion-content');
  container.innerHTML = createLocalizacionHTML(getSchoolInfo());
}

/* ============================
   INICIALIZACIÓN
   ============================ */

/**
 * Inicializa la aplicación completa.
 */
function init() {
  // Estado inicial del test
  document.getElementById('q-txt').innerText = 'Selecciona cuántas preguntas quieres para empezar tu test de Autoescuela Matías.';
  document.getElementById('options-title').style.display = 'none';
  document.getElementById('options-box').innerHTML = '';
  document.getElementById('feedback').style.display = 'none';
  document.getElementById('result-box').style.display = 'none';
  document.getElementById('question-counter').textContent = 'Pregunta 0 / 0';
  document.getElementById('question-topic').textContent = 'Tema: —';
  document.getElementById('next-btn').addEventListener('click', nextQuestion);

  // Inicializar todas las páginas
  initHome();
  initTemario();
  initLocalizacion();
}

init();
