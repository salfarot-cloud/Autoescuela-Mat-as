/**
 * Modelo de Datos - Autoescuela Matías
 * 
 * Banco de preguntas con estructuras validadas según SPEC.md
 * Cada pregunta contiene: texto, imagen (600x200), opciones y respuesta correcta
 */

// Constantes de configuración
const CONFIG = {
  TOTAL_PREGUNTAS: 10,
  IMAGEN_ANCHO: 600,
  IMAGEN_ALTO: 200,
  PREGUNTAS_TEST: 10
};

// Banco completo de preguntas
const BANCO_PREGUNTAS = [
  {
    id: 1,
    texto: "¿Velocidad máxima en autopista para turismos?",
    imagen: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=200&fit=crop",
    opciones: ["90 km/h", "100 km/h", "120 km/h"],
    correcta: 2,
    dificultad: "básica"
  },
  {
    id: 2,
    texto: "Semáforo ámbar fijo: si puedes detenerte, ¿qué haces?",
    imagen: "https://images.unsplash.com/photo-1486299204817-a6f6c1b30b60?w=600&h=200&fit=crop",
    opciones: ["Acelerar", "Detenerte", "Pasar igual"],
    correcta: 1,
    dificultad: "básica"
  },
  {
    id: 3,
    texto: "En una glorieta, ¿quién tiene prioridad?",
    imagen: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=200&fit=crop",
    opciones: ["El que entra", "El que circula dentro", "El más grande"],
    correcta: 1,
    dificultad: "básica"
  },
  {
    id: 4,
    texto: "Línea continua en la calzada: ¿qué significa?",
    imagen: "https://images.unsplash.com/photo-1460661326751-86db01b11c7c?w=600&h=200&fit=crop",
    opciones: ["Prohibido adelantar", "Solo recomendación", "No significa nada"],
    correcta: 0,
    dificultad: "básica"
  },
  {
    id: 5,
    texto: "Si has bebido alcohol, ¿qué debes hacer?",
    imagen: "https://images.unsplash.com/photo-1608537324008-2ffc9c0b031d?w=600&h=200&fit=crop",
    opciones: ["Conducir despacio", "Esperar", "No conducir"],
    correcta: 2,
    dificultad: "básica"
  },
  {
    id: 6,
    texto: "Peatón cruzando sin semáforo: ¿qué haces?",
    imagen: "https://images.unsplash.com/photo-1518050064318-f75f72f0b66c?w=600&h=200&fit=crop",
    opciones: ["Claxon", "Detenerte", "Pasar antes"],
    correcta: 1,
    dificultad: "básica"
  },
  {
    id: 7,
    texto: "Niebla densa: ¿qué luces usas?",
    imagen: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=200&fit=crop",
    opciones: ["Largas", "Cortas + antiniebla", "Ninguna"],
    correcta: 1,
    dificultad: "intermedia"
  },
  {
    id: 8,
    texto: "Distancia de seguridad: ¿cuál es correcta?",
    imagen: "https://images.unsplash.com/photo-1476973422084-e8fa66ff9895?w=600&h=200&fit=crop",
    opciones: ["La necesaria para frenar", "5 metros", "Solo en autopista"],
    correcta: 0,
    dificultad: "intermedia"
  },
  {
    id: 9,
    texto: "Paso a nivel sin barreras y viene un tren: ¿qué haces?",
    imagen: "https://images.unsplash.com/photo-1474487260768-7cc820cf3b41?w=600&h=200&fit=crop",
    opciones: ["Acelerar", "Detenerte", "Pasar si está lejos"],
    correcta: 1,
    dificultad: "avanzada"
  },
  {
    id: 10,
    texto: "Señal de STOP: ¿qué debes hacer?",
    imagen: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=200&fit=crop",
    opciones: ["Reducir", "Detenerse y ceder", "Solo si viene alguien"],
    correcta: 1,
    dificultad: "avanzada"
  }
];

/**
 * Obtiene el banco de preguntas completo
 * @returns {Array<Object>} Array de preguntas
 */
function getBancoPreguntas() {
  return BANCO_PREGUNTAS;
}

/**
 * Obtiene la configuración de la aplicación
 * @returns {Object} Objeto de configuración
 */
function getConfig() {
  return CONFIG;
}
