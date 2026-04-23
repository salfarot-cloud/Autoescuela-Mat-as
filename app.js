/**
 * Orquestación Principal - Autoescuela Matías Campus 2026
 *
 * Controlador que:
 * 1. Usa componentes puros (components.js) para generar HTML
 * 2. Usa modelo de datos (data.js) para obtener preguntas y temario
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
 * @param {string} id - ID del panel a mostrar ('test' | 'temario')
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
 * Baraja el banco, toma N preguntas y carga la primera.
 * @param {number} n - Número de preguntas a realizar
 */
function setQuestionCount(n) {
  // Marcar botón activo
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
 * Carga y renderiza la pregunta actual en pantalla.
 * Usa createOptionsListHTML() (componente puro) para generar las opciones.
 */
function loadQuestion() {
  if (!selectedQuestions.length) return;
  busy = false;

  const data = selectedQuestions[currentIndex];

  // Actualizar imagen
  const img = document.getElementById('main-img');
  img.src = data.img;
  img.onerror = () => {
    img.src = 'https://placehold.co/800x600/ffb6c1/ffffff?text=Autoescuela+Matias';
  };

  // Actualizar texto de pregunta
  document.getElementById('q-txt').innerText = data.q;

  // Actualizar badges con componente puro
  const { counter, topic } = createCounterText(currentIndex, totalQuestions);
  document.getElementById('question-counter').textContent = counter;
  document.getElementById('question-topic').textContent = topic;

  // Resetear feedback y botones
  document.getElementById('feedback').style.display = 'none';
  document.getElementById('feedback').innerHTML = '';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('result-box').style.display = 'none';

  // Renderizar opciones con componente puro
  const optionsBox = document.getElementById('options-box');
  optionsBox.innerHTML = createOptionsListHTML(data.opts);

  // Adjuntar eventos a las opciones ya renderizadas
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

  // Mostrar feedback con componente puro
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
 * Muestra el resultado final usando el componente puro createResultHTML().
 */
function showResult() {
  const resultBox = document.getElementById('result-box');
  resultBox.innerHTML = createResultHTML(correctCount, totalQuestions);
  resultBox.style.display = 'block';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('feedback').style.display = 'none';

  // Adjuntar evento al botón de reinicio generado por el componente
  resultBox.querySelector('.restart-btn').addEventListener('click', restartTest);
}

/**
 * Reinicia el test y vuelve al estado inicial de selección.
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
 * Renderiza el temario completo usando createTemarioHTML() (componente puro).
 * Adjunta los eventos de acordeón tras insertar el HTML.
 */
function initTemario() {
  const grid = document.getElementById('topic-grid');
  grid.innerHTML = createTemarioHTML(getManualData());

  // Adjuntar eventos de acordeón
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
   INICIALIZACIÓN
   ============================ */

/**
 * Inicializa la aplicación: estado inicial y carga el temario.
 */
function init() {
  document.getElementById('q-txt').innerText = 'Selecciona cuántas preguntas quieres para empezar tu test de Autoescuela Matías.';
  document.getElementById('options-title').style.display = 'none';
  document.getElementById('options-box').innerHTML = '';
  document.getElementById('feedback').style.display = 'none';
  document.getElementById('result-box').style.display = 'none';
  document.getElementById('question-counter').textContent = 'Pregunta 0 / 0';
  document.getElementById('question-topic').textContent = 'Tema: —';

  // Adjuntar evento al botón "Siguiente"
  document.getElementById('next-btn').addEventListener('click', nextQuestion);

  initTemario();
}

init();
