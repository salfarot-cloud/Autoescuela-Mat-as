# Especificaciones - Autoescuela Matías Test

## Requisitos Funcionales

### 1. Test de Conocimiento
- 10 preguntas aleatorias del banco total
- Selección de opción única
- Feedback inmediato (verde correcto, rojo incorrecto)
- Barra de progreso

### 2. Preguntas
- Cada pregunta debe tener:
  - Número de pregunta
  - Imagen relevante (600x200px)
  - Texto de la pregunta
  - 3 opciones de respuesta
  - 1 respuesta correcta

### 3. Resultados
- Total de aciertos / 10
- Nivel de desempeño:
  - ≤4: Nivel básico (rojo)
  - 5-8: Nivel intermedio (verde)
  - 9-10: Nivel avanzado (azul)

### 4. Interfaz
- Botón "Reiniciar" - comienza nuevo test
- Botón "Siguiente" - carga siguiente pregunta
- No permitir pasar sin responder

## Banco de Preguntas

```javascript
[
  { 
    texto: "¿Velocidad máxima en autopista para turismos?",
    imagen: "https://images.unsplash.com/...",
    opciones: ["90 km/h", "100 km/h", "120 km/h"],
    correcta: 2
  },
  // ... 9 preguntas más
]
```

## Estructura de Archivos

```
.
├── index.html          # Estructura HTML
├── styles.css          # Estilos
├── data.js             # Banco de preguntas
├── components.js       # Componentes puros (HTML)
├── app.js              # Orquestación
├── RULES.md            # Este archivo
└── SPEC.md             # Especificaciones
```

## Componentes Requeridos

### createQuestionCard(pregunta, numero)
Retorna HTML con la pregunta, imagen y texto.

### createOptionsList(pregunta)
Retorna HTML con las opciones de respuesta.

### createResultCard(correctas, total)
Retorna HTML con los resultados finales.

### createProgressBar(actual, total)
Retorna HTML con la barra de progreso.

## Requisitos de Presentación

- Degradado: `#fbcfe8 → #f9a8d4 → #f472b6`
- Colores texto: `#4a044e`, `#9d174d`, `#831843`
- Redondeado: 24px (card), 18px (question), 14px (option)
- Transiciones: 0.18s ease
- Responsive: máximo 900px de ancho

## Eventos

- Click en opción: marcar como respondida, mostrar resultado
- Click "Siguiente": cargar siguiente pregunta
- Click "Reiniciar": volver a pregunta 1, reset contadores
