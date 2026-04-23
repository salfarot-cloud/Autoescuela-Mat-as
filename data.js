// Banco de preguntas de la autoescuela con imágenes
const bancoPreguntas = [
  {
    texto: "¿Velocidad máxima en autopista para turismos?",
    imagen: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=200&fit=crop",
    opciones: ["90 km/h", "100 km/h", "120 km/h"],
    correcta: 2
  },
  {
    texto: "Semáforo ámbar fijo: si puedes detenerte, ¿qué haces?",
    imagen: "https://images.unsplash.com/photo-1486299204817-a6f6c1b30b60?w=600&h=200&fit=crop",
    opciones: ["Acelerar", "Detenerte", "Pasar igual"],
    correcta: 1
  },
  {
    texto: "En una glorieta, ¿quién tiene prioridad?",
    imagen: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=200&fit=crop",
    opciones: ["El que entra", "El que circula dentro", "El más grande"],
    correcta: 1
  },
  {
    texto: "Línea continua en la calzada:",
    imagen: "https://images.unsplash.com/photo-1460661326751-86db01b11c7c?w=600&h=200&fit=crop",
    opciones: ["Prohibido adelantar", "Solo recomendación", "No significa nada"],
    correcta: 0
  },
  {
    texto: "Si has bebido alcohol:",
    imagen: "https://images.unsplash.com/photo-1608537324008-2ffc9c0b031d?w=600&h=200&fit=crop",
    opciones: ["Conducir despacio", "Esperar", "No conducir"],
    correcta: 2
  },
  {
    texto: "Peatón cruzando sin semáforo:",
    imagen: "https://images.unsplash.com/photo-1518050064318-f75f72f0b66c?w=600&h=200&fit=crop",
    opciones: ["Claxon", "Detenerte", "Pasar antes"],
    correcta: 1
  },
  {
    texto: "Niebla densa: ¿qué luces usas?",
    imagen: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=200&fit=crop",
    opciones: ["Largas", "Cortas + antiniebla", "Ninguna"],
    correcta: 1
  },
  {
    texto: "Distancia de seguridad:",
    imagen: "https://images.unsplash.com/photo-1476973422084-e8fa66ff9895?w=600&h=200&fit=crop",
    opciones: ["La necesaria para frenar", "5 metros", "Solo en autopista"],
    correcta: 0
  },
  {
    texto: "Paso a nivel sin barreras y viene un tren:",
    imagen: "https://images.unsplash.com/photo-1474487260768-7cc820cf3b41?w=600&h=200&fit=crop",
    opciones: ["Acelerar", "Detenerte", "Pasar si está lejos"],
    correcta: 1
  },
  {
    texto: "Señal de STOP:",
    imagen: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=200&fit=crop",
    opciones: ["Reducir", "Detenerse y ceder", "Solo si viene alguien"],
    correcta: 1
  }
];

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = bancoPreguntas;
}
