# ConectaBarrio

MVP en Angular 22 para que RedManos consulte, busque, priorice y registre solicitudes comunitarias.

## Producto
- **Problema:** las solicitudes llegan por canales dispersos y la coordinadora no puede encontrarlas ni priorizarlas.
- **Funciones:** inicio con resumen, listado con búsqueda, detalle por URL, prioridades con contador, líderes, registro (POST simulado).
- **Fuera de alcance:** autenticación, backend propio, base de datos, pruebas automatizadas.
- **Riesgo:** JSONPlaceholder simula el POST; las solicitudes nuevas se pierden al recargar.

## Ejecutar
```bash
npm install
ng serve      # http://localhost:4200
ng build      # dist/conecta-barrio/browser
```
Requiere Node 20.19+ / 22.12+ / 24.

## Rutas
`/` · `/solicitudes` · `/solicitudes/nueva` · `/solicitudes/:id` · `/lideres` · `**` (404). Páginas con lazy loading.

## Arquitectura
- `pages/`: una por ruta (coordina el caso de uso).
- `components/solicitud-card`: recibe `solicitud` y `prioritaria` (input), emite `alternarPrioridad` (output).
- `services/`: HTTP + Signals (fuente única de verdad, vistas `asReadonly`, `computed` para totales, actualizaciones inmutables).
- `models/`: contratos de `/posts` y `/users`.

## API
`https://jsonplaceholder.typicode.com` — GET /posts, GET /users, POST /posts (simulado, no persiste).

## Pruebas manuales
Completar P-01 a P-13 del taller (ver `docs/evidencias`).

## Despliegue
URL: _pendiente_. `vercel.json` ya incluye el fallback a `index.html` para rutas profundas.

## Limitaciones y siguientes pasos
Datos simulados; siguiente paso: reemplazar por backend Spring Boot.
