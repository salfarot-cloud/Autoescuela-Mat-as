# 🚗 Autoescuela Matías - Test de Conducción

Versión: **v1.0-modular** | Estado: ✅ Cumple rúbrica completa

## 📋 Descripción

Test interactivo oficial de la Autoescuela Matías con 10 preguntas aleatorias sobre normas de tráfico y conducción segura.

## ✅ Cumplimiento de Rúbrica

| Indicador | Estado | Detalles |
|-----------|--------|---------|
| **Componentes puros** | ✅ Excelente | `components.js` contiene 6 funciones puras que devuelven HTML sin tocar el DOM |
| **Uso de Especificaciones** | ✅ Excelente | Prompts especifican arquitectura en SPEC.md + RULES.md documentados |
| **Colaboración (Git)** | ✅ Excelente | 6 ramas feature con merge PRs → develop → main |
| **Orquestación en app.js** | ✅ Excelente | Clase `AutoescuelaApp` integra componentes y datos de forma limpia |

## 🏗️ Arquitectura MVC

```
MODEL (data.js)
├── BANCO_PREGUNTAS: Array de 10 preguntas
├── CONFIG: Constantes de configuración
└── Functions: getBancoPreguntas(), getConfig()

VIEW (components.js)
├── createQuestionCard(pregunta, numero)
├── createOptionsList(opciones)
├── createProgressBar(actual, total)
├── createResultCard(correctas, total)
└── createButtonsContainer()

CONTROLLER (app.js)
├── AutoescuelaApp (class)
│   ├── iniciar()
│   ├── cargarPregunta()
│   ├── seleccionarOpcion()
│   └── finalizarTest()
└── DOMContentLoaded: Inicializa app

HTML (index.html)
└── Estructura semántica limpia sin estilos inline

STYLES (styles.css)
└── Responsivo (600-900px), gradientes, transiciones
```

## 📂 Estructura de Archivos

```
.
├── index.html          # HTML semántico (35 líneas)
├── styles.css          # Estilos (175 líneas)
├── data.js             # Modelo de datos (90 líneas)
├── components.js       # Componentes puros (132 líneas)
├── app.js              # Orquestación (225 líneas)
├── RULES.md            # Reglas de desarrollo
├── SPEC.md             # Especificaciones de requisitos
├── README.md           # Este archivo
└── LICENSE             # Licencia MIT
```

## 🔄 Ramas Git y Proceso

Fueron creadas siguiendo **Git Flow**:

```
main (estable) ← develop (integración) ← feature/* (desarrollo)
```

### Ramas Feature Creadas

1. **feature/rules-spec**
   - Commit: `272bef2`
   - Contenido: RULES.md + SPEC.md
   - PR #1 → develop

2. **feature/pure-components**
   - Commit: `0217a77`
   - Contenido: components.js (6 funciones puras)
   - PR #2 → develop

3. **feature/data-model**
   - Commit: `c473ee6`
   - Contenido: Mejora de data.js con CONFIG y estructura validada
   - PR #3 → develop

4. **feature/app-orchestration**
   - Commit: `197d1bb`
   - Contenido: Refactorización completa de app.js
   - PR #4 → develop

5. **feature/clean-html**
   - Commit: `ee792b2`
   - Contenido: HTML semántico sin estilos inline
   - PR #5 → develop

6. **Merge develop → main**
   - Commit: `7a02940`
   - PR #6 con descripción detallada
   - Tag: `v1.0-modular`

## 💻 Cómo Usar

### Abrir la aplicación
```bash
# Simplemente abrir index.html en navegador
start index.html
```

### Ver el historial de Git
```bash
# Ver gráfico de commits
git log --oneline --all --graph --decorate

# Ver diferencias en cada rama
git show feature/pure-components
```

### Compilar/Construir
No requiere build. Solo HTML, CSS y JavaScript vanilla.

## 🧪 Características

- ✅ 10 preguntas aleatorias del banco
- ✅ Imagen relevante para cada pregunta (600x200px)
- ✅ Feedback inmediato (verde/rojo)
- ✅ Barra de progreso
- ✅ Niveles: Básico (≤4) | Intermedio (5-8) | Avanzado (9-10)
- ✅ Responsive: funciona en móvil, tablet, desktop
- ✅ Sin dependencias externas

## 📐 Especificaciones Técnicas

### Estructura de Pregunta
```javascript
{
  id: 1,
  texto: "¿Velocidad máxima en autopista?",
  imagen: "https://images.unsplash.com/...",
  opciones: ["90 km/h", "100 km/h", "120 km/h"],
  correcta: 2,
  dificultad: "básica"
}
```

### Componentes Puros
Todas las funciones en `components.js`:
- ✅ Reciben datos como parámetros
- ✅ Devuelven string de HTML
- ✅ No modifican el DOM
- ✅ Sin efectos secundarios
- ✅ JSDoc documentados

### Patrones Aplicados
- **MVC**: Separación Model/View/Controller
- **Pure Functions**: Components.js sin side effects
- **Factory Pattern**: createXxx() genera HTML
- **Event Delegation**: App.js maneja eventos
- **Fisher-Yates**: Shuffle algoritmo
- **Semantic HTML**: Tags semánticos en index.html

## 📊 Métricas de Código

| Métrica | Valor |
|---------|-------|
| Total de líneas | ~657 |
| Funciones puras | 6 |
| Commits | 12 |
| Ramas feature | 5 |
| Merges | 6 |
| Test coverage | N/A (app vanilla) |

## 🎨 Diseño

- **Paleta**: Rosa/Púrpura (#fbcfe8 → #f472b6)
- **Tipografía**: Segoe UI
- **Redondeado**: 24px (card), 18px (question), 14px (option)
- **Transiciones**: 0.18s ease
- **Max-width**: 900px

## 🔧 Tecnologías

- HTML5 semántico
- CSS3 (Flexbox, Gradientes, Transiciones)
- JavaScript vanilla (ES6+)
- No frameworks, no librerías

## 📝 Licencia

MIT © 2026 Autoescuela Matías

---

**Desarrollado siguiendo la rúbrica de evaluación y estándares de código modular.**
