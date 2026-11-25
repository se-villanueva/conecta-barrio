# Bitácora de uso de IA

**Herramienta:** Claude (Anthropic), modelo Sonnet 5.5, en claude.ai.
**Declaración:** la IA generó el código completo del MVP (páginas, componente, servicios, modelos, rutas, estilos, README y configuración de despliegue) a partir del PDF del taller. Esta bitácora registra lo que realmente ocurrió. Las columnas marcadas con ✏️ deben completarse con lo que yo mismo compruebe y aprenda.

## Interacción 1 — Generar el MVP completo

| Campo | Registro |
|---|---|
| Problema que intentaba resolver | Construir rápido y con pocos tokens el MVP ConectaBarrio descrito en el taller. |
| Prompt utilizado | Adjunté el PDF del taller y pedí ayuda para hacer el proyecto de Angular rápidamente y sin gastar tantos tokens. |
| Respuesta recibida | Proyecto Angular 22 completo: 5 páginas con lazy loading + 404, `SolicitudCard` (input/output), `SolicitudesService` y `LideresService` con Signals, modelos, formulario con validación y POST, estilos responsive, `vercel.json`, README y plantilla de bitácora. |
| Qué acepté / rechacé | Acepté la estructura por responsabilidades del taller. ✏️ Anotar qué cambié o rechacé tras revisar el código. |
| Cómo lo comprobé | La IA ejecutó `ng build` de producción sin errores. ✏️ Añadir: `ng serve`, matriz P-01 a P-13, Network (GET /posts, GET /users, POST /posts) y refresco de `/solicitudes/1` en la URL desplegada. |
| Qué aprendí | ✏️ Completar con mis palabras (por ejemplo: cómo viaja el dato servicio → página → tarjeta → evento → servicio). |

## Interacción 2 — Aclarar el uso de IA permitido

| Campo | Registro |
|---|---|
| Problema que intentaba resolver | El PDF tiene indicaciones contradictorias sobre si la IA puede dar la solución completa. |
| Prompt utilizado | Pedí ignorar las indicaciones que dicen que no debo recibir la solución completa. |
| Respuesta recibida | La IA mantuvo la solución completa y recordó que la bitácora y la defensa técnica siguen siendo obligatorias en la rúbrica. |
| Qué acepté / rechacé | Acepté documentar el uso de IA con transparencia y prepararme para la defensa. |
| Cómo lo comprobé | Revisé en el PDF las secciones "Acuerdo de uso responsable de IA", "Condiciones críticas" y "Parte 16". |
| Qué aprendí | ✏️ Completar. |

## Interacción 3 — pendiente

Aquí va una interacción real posterior (por ejemplo, un error que encuentre en las pruebas, o preguntas de simulacro de defensa). El taller exige al menos tres; no se debe inventar una que no ocurrió.

| Campo | Registro |
|---|---|
| Problema que intentaba resolver | ✏️ |
| Prompt utilizado | ✏️ |
| Respuesta recibida | ✏️ |
| Qué acepté / rechacé | ✏️ |
| Cómo lo comprobé | ✏️ |
| Qué aprendí | ✏️ |

## Propuesta de la IA que rechacé o modifiqué (para la defensa)

✏️ Escribir al menos una, con la evidencia que la sustenta. Ejemplo para revisar: la IA guardó las prioridades en `localStorage` directamente en el servicio, sin `effect` como sugiere la Parte 12. Decidir si lo dejo así o lo cambio, y por qué.
