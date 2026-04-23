# Reglas de Desarrollo - Autoescuela Matías

## 1. Estructura de Componentes

### Componentes Puros (components.js)
- Las funciones deben ser **puras**: devuelven strings de HTML sin efectos secundarios
- **NO deben tocar el DOM directamente**
- Reciben datos como parámetros
- Formato: `function createElement(data) { return '<html>...</html>'; }`

### Ejemplo Correcto
```javascript
function createQuestionCard(pregunta, numero) {
  return `
    <div class="question-box">
      <div class="question-number">Pregunta ${numero}</div>
      <img src="${pregunta.imagen}" alt="..." class="question-image" />
      <div class="question-text">${pregunta.texto}</div>
    </div>
  `;
}
```

### Ejemplo Incorrecto ❌
```javascript
function createQuestionCard(pregunta) {
  const div = document.createElement('div'); // ❌ Toca el DOM
  div.innerHTML = pregunta.texto;
  document.body.appendChild(div); // ❌ Modifica directamente
}
```

## 2. Separación de Responsabilidades

- **data.js**: Datos puros (banco de preguntas, constantes)
- **components.js**: Componentes que devuelven HTML
- **app.js**: Orquestación y lógica de eventos
- **styles.css**: Estilos
- **index.html**: Estructura HTML semántica

## 3. Patrones MVC

- **Model**: data.js (datos)
- **View**: components.js (presentación)
- **Controller**: app.js (lógica)

## 4. Requisitos de Código

✅ **DEBE**:
- Usar funciones puras para componentes
- Documentar componentes con JSDoc
- Nombres de variables descriptivos
- Separar HTML de lógica
- Usar template literals para HTML

❌ **NO DEBE**:
- Variables globales (excepto configuración)
- Modificación directa del DOM en components.js
- Código duplicado
- Funciones mixtas (HTML + lógica)
- Inline styles (usar clases CSS)

## 5. Git Workflow

- `main`: versión estable
- `develop`: rama base para features
- `feature/*`: nuevas funcionalidades
- Commits claros y descriptivos
- PRs con descripción técnica
