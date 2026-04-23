/**
 * Modelo de Datos - Autoescuela Matías Campus 2026
 *
 * Banco de preguntas, temario resumido e información de la autoescuela.
 * Cada pregunta: q (texto), img (url), opts (opciones), ans (índice correcto), why (explicación).
 * Cada tema: t (título), d (descripción).
 */

// Configuración global de la app
const CONFIG = {
  PREGUNTAS_TEST: 10
};

// Banco completo de preguntas
const QUIZ_BANK = [
  {
    q: "Según el manual, ¿quién se considera CONDUCTOR?",
    img: "https://images.unsplash.com/photo-1516570161787-2fd917215a3d?q=80&w=800",
    opts: [
      "La persona que empuja una bicicleta o un ciclomotor",
      "La persona que empuja una motocicleta",
      "La persona que camina por la acera"
    ],
    ans: 1,
    why: "Quien empuja carro, bici o ciclomotor es peatón. Quien empuja una motocicleta se considera conductor."
  },
  {
    q: "Un peatón es la persona que...",
    img: "https://images.unsplash.com/photo-1521292270410-a8c53642e9d0?q=80&w=800",
    opts: [
      "Transita a pie por la vía o empuja un carro, bici o ciclomotor",
      "Conduce un turismo por la calzada",
      "Solo camina por la acera"
    ],
    ans: 0,
    why: "El manual define peatón como quien transita a pie o empuja carro, bici o ciclomotor."
  },
  {
    q: "¿Qué vehículo se considera REMOLQUE LIGERO?",
    img: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=800",
    opts: [
      "Aquel con MMA superior a 750 kg",
      "Aquel con MMA hasta 750 kg",
      "Aquel con MMA hasta 3.500 kg"
    ],
    ans: 1,
    why: "Remolque ligero = hasta 750 kg de Masa Máxima Autorizada (MMA)."
  },
  {
    q: "¿Qué velocidad máxima puede alcanzar un ciclomotor?",
    img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=800",
    opts: [
      "45 km/h",
      "50 km/h",
      "60 km/h"
    ],
    ans: 0,
    why: "El ciclomotor tiene velocidad máxima de 45 km/h según el manual."
  },
  {
    q: "Esta señal indica la proximidad de:",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Spain_traffic_signal_paso_a_nivel_con_barreras.png/480px-Spain_traffic_signal_paso_a_nivel_con_barreras.png",
    opts: [
      "Paso a nivel con barreras",
      "Paso a nivel sin barreras",
      "Estación de tren"
    ],
    ans: 0,
    why: "Triángulo con tren y barrera = paso a nivel con barreras."
  },
  {
    q: "Si un agente levanta el brazo verticalmente, debes:",
    img: "https://images.unsplash.com/photo-1521292270410-a8c53642e9d0?q=80&w=800",
    opts: [
      "Detenerte solo si vienes de frente",
      "Detenerte solo si vienes por detrás",
      "Detenerte vengas de donde vengas"
    ],
    ans: 2,
    why: "Brazo levantado = detención obligatoria para todos los usuarios."
  },
  {
    q: "Esta señal prohíbe el paso a:",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Spain_traffic_signal_prohibido_vehiculos_a_motor.png/480px-Spain_traffic_signal_prohibido_vehiculos_a_motor.png",
    opts: [
      "Todos los vehículos",
      "Vehículos de motor",
      "Solo motocicletas"
    ],
    ans: 1,
    why: "Prohíbe el paso a vehículos de motor; pueden pasar peatones, ciclos, etc."
  },
  {
    q: "¿Qué documentación es obligatoria llevar en el vehículo?",
    img: "https://images.unsplash.com/photo-1511391037251-0a3f66f9a9e1?q=80&w=800",
    opts: [
      "Permiso de conducción, permiso de circulación y tarjeta ITV",
      "Solo el permiso de conducción",
      "Solo el recibo del seguro"
    ],
    ans: 0,
    why: "Obligatoria: permiso de conducción, permiso de circulación y tarjeta ITV."
  },
  {
    q: "Esta señal azul con número indica:",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Spain_traffic_signal_velocidad_minima_obligatoria.png/480px-Spain_traffic_signal_velocidad_minima_obligatoria.png",
    opts: [
      "Velocidad máxima",
      "Velocidad mínima obligatoria",
      "Velocidad recomendada"
    ],
    ans: 1,
    why: "Círculo azul con número = velocidad mínima obligatoria."
  },
  {
    q: "¿Qué vehículos deben tener seguro obligatorio?",
    img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800",
    opts: [
      "Solo turismos y motos",
      "Vehículos de motor, ciclomotores y remolques pesados",
      "Solo vehículos que circulen por autopista"
    ],
    ans: 1,
    why: "Seguro obligatorio: vehículos de motor, ciclomotores y remolques/semirremolques pesados."
  },
  {
    q: "Esta señal con dos coches, uno rojo y otro negro, significa:",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Spain_traffic_signal_prohibido_adelantar.png/480px-Spain_traffic_signal_prohibido_adelantar.png",
    opts: [
      "Prohibido adelantar",
      "Prohibido adelantar solo a camiones",
      "Fin de prohibición de adelantamiento"
    ],
    ans: 0,
    why: "Dos coches (rojo y negro) = prohibido adelantar."
  },
  {
    q: "En esta zona residencial con niños jugando, la velocidad máxima es:",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Spain_traffic_signal_zona_residencial.png/480px-Spain_traffic_signal_zona_residencial.png",
    opts: [
      "10 km/h",
      "20 km/h",
      "30 km/h"
    ],
    ans: 0,
    why: "En la zona de estancia y juego la velocidad máxima es 10 km/h."
  }
];

// Temario resumido del manual B 2026
const MANUAL_DATA = [
  {
    t: "Tema 0 – Definiciones",
    d: `- Conductor: persona que maneja el mecanismo de dirección o empuja una motocicleta.
- Peatón: persona que transita a pie o empuja carro, bici o ciclomotor.
- Usuario del vehículo: conductor y pasajeros.
- Vehículos: sin motor, con motor no considerados de motor (VMP, ciclomotor, cuatriciclo ligero) y vehículos de motor.
- Remolque ligero: hasta 750 kg MMA. Remolque no ligero: más de 750 kg MMA.`
  },
  {
    t: "Tema 1 – Documentación",
    d: `- Obligatoria: permiso de conducción, permiso de circulación y tarjeta ITV.
- Recibo del seguro: recomendable, no obligatorio.
- Renovación permiso de conducción: cada 10 años (cada 5 a partir de 65 años).
- ITV: según tipo de vehículo.
- Seguro obligatorio: vehículos de motor, ciclomotores y remolques pesados.`
  },
  {
    t: "Tema 2 – Señalización de la vía",
    d: `- Orden de prioridad: 1) Agentes, 2) Balizamiento, 3) Semáforos, 4) Señales verticales, 5) Marcas viales.
- Agentes: brazo levantado → detenerse todos.
- Silbato: toque corto → detenerse; toque largo → reanudar.
- Balizamiento: conos, paneles, luces rojas fijas.`
  },
  {
    t: "Tema 3 – Señales verticales",
    d: `- Peligro: triángulos con borde rojo.
- Reglamentación: circulares con borde rojo (prohibiciones) o fondo azul (obligaciones).
- Ceda el paso y STOP: prioridad especial.
- Prohibiciones: velocidad, adelantamientos, giros.`
  },
  {
    t: "Tema 4 – Señales de indicación",
    d: `- Autovía, autopista, vía para automóviles.
- Carril VAO, carril bus/taxi/moto.
- Zona residencial (10 km/h) y zona de coexistencia (20 km/h).`
  },
  {
    t: "Tema 5 – Marcas viales",
    d: `- Continuas: separan sentidos opuestos, no se pueden cruzar.
- Discontinuas: separan carriles del mismo sentido.
- Líneas longitudinales: amarillas (opuestos), blancas (mismo sentido).
- Marcas transversales: pasos de peatones, STOP, ceda el paso.`
  },
  {
    t: "Tema 6 – Normas de circulación",
    d: `- Sentido de circulación: derecha en vías de doble sentido.
- Adelantamiento: por la izquierda, salvo excepciones.
- Giro: indicar con antelación, ceder paso según corresponda.
- Distancia de seguridad: al menos 2 segundos del vehículo delantero.`
  },
  {
    t: "Tema 7 – Velocidades",
    d: `- General: 50 km/h en poblado, 90 km/h fuera, 120 km/h autopista.
- Adaptar a condiciones: meteorológicas, tráfico, vehículo, conductor.
- Reducciones: curvas, cambios de rasante, zonas escolares.
- Multas por exceso: graves a partir de 30 km/h sobre límite.`
  },
  {
    t: "Tema 8 – Adelantamientos",
    d: `- Prohibidos: en curvas, cambios de rasante, intersecciones, pasos a nivel.
- Obligatorios: cuando vehículo lento obstruye.
- Procedimiento: comprobar visibilidad, indicar maniobra, acelerar y volver al carril.
- Distancia mínima: 1,5 metros al adelantar.`
  },
  {
    t: "Tema 9 – Prioridad de paso",
    d: `- Intersecciones sin señales: vehículos por la derecha tienen prioridad.
- Incorporaciones: ceder paso al tráfico de la vía principal.
- Glorietas: prioridad al tráfico circular.
- Peatones: siempre tienen prioridad en pasos señalizados.`
  },
  {
    t: "Tema 10 – Estacionamiento",
    d: `- Prohibido: en doble fila, aceras, pasos de peatones, curvas, túneles.
- Permitido: en batería, en línea, en aparcamientos señalizados.
- Zona azul: pago por tiempo limitado.
- Vehículos de minusválidos: plazas reservadas y gratuitas.`
  },
  {
    t: "Tema 11 – Conducción segura",
    d: `- Factores de riesgo: velocidad, alcohol, drogas, fatiga, distracciones.
- Conducción defensiva: anticipar situaciones, mantener distancia.
- Condiciones meteorológicas: lluvia, niebla, hielo afectan adherencia.
- Mantenimiento: neumáticos, frenos, luces, líquidos.`
  },
  {
    t: "Tema 12 – Primeros auxilios",
    d: `- Evaluación inicial: estado de consciencia, respiración, hemorragias.
- Posición lateral de seguridad: para víctimas inconscientes.
- RCP: 30 compresiones + 2 ventilaciones.
- Triángulo de preseñalización: colocar a 50 metros en autopista.`
  },
  {
    t: "Tema 13 – Mecánica básica",
    d: `- Motor: gasolina vs diésel, refrigeración, lubricación.
- Transmisión: embrague, caja de cambios, diferencial.
- Frenos: tambor vs disco, ABS previene bloqueo.
- Electricidad: batería, alternador, luces, arranque.`
  },
  {
    t: "Tema 14 – Medio ambiente",
    d: `- Contaminación: CO2, NOx, partículas afectan calidad del aire.
- Conducción eficiente: acelerar suavemente, mantener velocidad constante.
- Etiquetado ambiental: clasificación por emisiones (A-B-C-ECO).
- Zonas de bajas emisiones: restricciones por etiqueta.`
  }
];

// Información institucional de la autoescuela
const SCHOOL_INFO = {
  nombre: 'Autoescuela Matías',
  tagline: 'Tu camino al volante comienza aquí',
  descripcion: 'Más de 15 años formando conductores responsables en Málaga con el método más moderno y eficaz. Aprobamos con el campus digital 2026.',
  stats: [
    { valor: '15+', etiqueta: 'Años de experiencia' },
    { valor: '98%', etiqueta: 'Tasa de aprobados' },
    { valor: '2.000+', etiqueta: 'Alumnos formados' }
  ],
  servicios: [
    { icono: '📝', titulo: 'Tests Online', desc: 'Practica con nuestro campus digital disponible las 24h del día.' },
    { icono: '🚗', titulo: 'Clases Prácticas', desc: 'Vehículos modernos y profesores certificados y pacientes.' },
    { icono: '📚', titulo: 'Temario Resumido', desc: 'Material adaptado y simplificado al manual oficial B 2026.' },
    { icono: '🏆', titulo: 'Alta Tasa de Éxito', desc: 'El 98% de nuestros alumnos aprueban a la primera.' }
  ],
  contacto: {
    direccion: 'Calle Alcalá, 25, 29010 Málaga',
    telefono: '+34 952 123 456',
    email: 'info@autoescuelamatias.es',
    horario: [
      { dia: 'Lunes — Viernes', horas: '09:00 – 14:00 / 16:00 – 20:00' },
      { dia: 'Sábado', horas: '09:00 – 13:00' },
      { dia: 'Domingo', horas: 'Cerrado' }
    ]
  }
};

/**
 * Obtiene el banco de preguntas completo.
 * @returns {Array<Object>} Array de preguntas
 */
function getQuizBank() {
  return QUIZ_BANK;
}

/**
 * Obtiene los datos del temario resumido.
 * @returns {Array<Object>} Array de temas
 */
function getManualData() {
  return MANUAL_DATA;
}

/**
 * Obtiene la configuración de la aplicación.
 * @returns {Object} Objeto de configuración
 */
function getConfig() {
  return CONFIG;
}

/**
 * Obtiene la información institucional de la autoescuela.
 * @returns {Object} Objeto con nombre, stats, servicios y contacto
 */
function getSchoolInfo() {
  return SCHOOL_INFO;
}
