# Checklists de pruebas por departamento · DSIN ERP

Sitio estático (HTML, CSS y JavaScript, sin dependencias ni compilación) para que cada
departamento pruebe el sistema y entregue un reporte. Pensado para GitHub Pages.

## Estructura

```
index.html          Portal: lista de áreas
config.js           Dirección del sistema, nombre del ambiente y versión  ← revisar antes de publicar
comun/estilo.css    Estilos compartidos
comun/motor.js      Lógica compartida (guardado, filtros, reporte)
almacen/index.html  Página del área
almacen/datos.js    Contenido del área: introducción breve y 3 pruebas cortas por pantalla
pm/index.html       Página del área PM
pm/datos.js         Contenido del área PM (mismo formato)
.nojekyll           Para que GitHub Pages sirva los archivos tal cual
```

Cada área nueva es una carpeta con su `index.html` (copia del de `almacen/`, cambiando el título)
y su `datos.js`. En `index.html` del portal se activa poniendo `listo: true`.

## Publicar en GitHub Pages

1. Crear un repositorio y subir **el contenido de esta carpeta** a la raíz (que `index.html` quede en la raíz).
2. En el repositorio: Settings → Pages → Source: «Deploy from a branch», rama `main`, carpeta `/ (root)`.
3. La dirección queda como `https://USUARIO.github.io/REPOSITORIO/`. La de Almacén: `…/almacen/`.

Antes de publicar, revisar `config.js`:
- `urlSistema`: dirección del sistema que se va a probar (sin barra final). De ahí salen los botones «Abrir en el sistema».
- `ambiente` y `version`: se muestran en el encabezado y en los reportes.

## Dónde se guarda el avance

- En el navegador de cada persona (`localStorage`), por área. No hay servidor ni base de datos:
  nadie más ve el avance de otra persona.
- No caduca: permanece mientras no se borren los datos de navegación ni se use una ventana privada.
  La página pide al navegador almacenamiento persistente para que no lo elimine por falta de espacio.
- Cada persona debe usar siempre el mismo navegador y equipo (Chrome o Edge). Para cambiar de equipo:
  «Descargar reporte» y, en el otro navegador, «Más ▾» → «Recuperar avance desde un reporte».
- Si se cambia la dirección del sitio (otro repositorio u otro dominio), el navegador lo trata como
  un sitio distinto y el avance anterior no aparece: publicar una sola vez en la dirección definitiva.

## Reporte

«Descargar reporte» genera un archivo HTML (se abre en cualquier navegador y se puede imprimir o
guardar como PDF) con: nombre, área, usuario, sucursal, fechas de inicio y última modificación,
resumen de lo realizado, fallos y resultados no óptimos con sus comentarios, y el detalle por
pantalla con la fecha de realización y de modificación de cada prueba. «Más ▾» ofrece además un CSV para Excel.

## Privacidad

Un sitio de GitHub Pages es público para quien tenga la dirección. Las páginas llevan `noindex`
para que los buscadores no las listen, pero no tienen contraseña: no incluir en `datos.js`
contraseñas, datos de clientes ni información que no deba salir de la empresa.
