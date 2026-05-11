# Documentación Técnica del Frontend

Este documento detalla la estructura, convenciones y la lógica de programación del frontend de la aplicación. Está orientado a desarrolladores e Inteligencias Artificiales para entender cómo está ensamblada la vista, cómo funciona la herencia de plantillas y la estructura de cada módulo.

## 1. Sistema de Plantillas y Herencia

El framework frontend utiliza un motor de plantillas propio basado en etiquetas de comentarios HTML para inyectar contenido, heredar estructuras y reemplazar bloques lógicos.

### `main.html` (Plantilla Base)
Es la cáscara principal de la aplicación. Carga todos los assets globales requeridos, como **Bootstrap, FontAwesome, Vue.js y Luxon**. Expone "slots" o bloques que pueden ser reemplazados por plantillas hijas usando la sintaxis `<!--define:[nombre_bloque]-->`:
- `<!--define:meta-->`
- `<!--define:title-->`
- `<!--define:head-->` (para inyectar estilos específicos)
- `<!--define:script-->` (para inyectar lógica específica)
- `<!--define:main-->` (para inyectar la interfaz de usuario/HTML)

Todo el contenido principal renderizado está envuelto bajo un contenedor `<div id="app">`, el cual es montado por una instancia global de Vue.js.

### `message.html` (Ejemplo de Herencia)
Plantillas como `message.html` heredan de `main.html` declarando `<!--use:main-->` en la primera línea. A partir de ahí, solo necesitan sobrescribir los bloques deseados (por ejemplo, redefiniendo `<!--define:main-->` para mostrar un error personalizado) o inyectar lógicas condicionales como `<!--if:data:doc.status==401--> ... <!--/if-->`.

## 2. Estructura de Módulos (Ej. `filemanager`)

Cada módulo o pantalla de la aplicación es encapsulado dentro de su propio directorio en `frontend/` (ej. `frontend/filemanager/`). 

### Convención de Archivos Punto de Entrada ()
El punto de entrada principal para un módulo se compone de tres archivos cuyo nombre base debe ser igual al definido en el backend views. Ejemplo:

*   **`modulo/_.html`**: Es el layout del módulo. Hereda de `main.html` (usa `<!--use:main-->`), inyecta dependencias al bloque de cabecera (llama a `modulo/_.css`), inyecta el layout HTML en el bloque `main` e importa su propia lógica (llama a `modulo/_.js`).
*   **`modulo/_.css`**: Contiene la hoja de estilos aislada y específica para ese módulo.
*   **`modulo/_.js`**: Contiene la lógica del módulo en JavaScript. Enlaza los datos al DOM utilizando Vue.js (declarando variables reactivas y métodos en objetos que luego se consumen en la vista mediante `v-on`, `v-show`, `v-model`, etc.).

### Inyección de Datos del Backend
A través de la directiva `{{data:[variable]}}`, el motor renderiza variables y objetos de entorno directamente desde el backend a la vista del cliente. Ejemplos comunes incluyen:
- `{{data:process.env.HOST_ARCHIVOSPUBLICOS}}`
- `{{data:JSON.stringify(doc.user.roles)}}` (útil para inyectar un JSON parseable directamente a un `<script>` del front).

## 3. Subplantillas en `section`

Para mantener el archivo `[modulo]/_.html` manejable y fomentar la reutilización de código (DRY), los módulos pueden subdividir su interfaz.

Dentro del directorio de un módulo, existe una carpeta llamada **`[modulo]/section/`**. Aquí se almacenan fragmentos o componentes visuales menores (por ejemplo, `header.html`, `menu.html`).

**Inclusión:**
En el archivo `[modulo]/_.html`, estos fragmentos se traen utilizando la directiva `<!--include:[ruta_sin_extension]-->`.
Por ejemplo, la instrucción `<!--include:[modulo]/section/header-->` importará el contenido de `frontend/[modulo]/section/header.html` dentro del DOM de `[modulo]/_.html`.

## 4. Tecnologías y Reactividad

- **Vue.js:** Gobierna el estado y la reactividad del frontend. Elementos del DOM en los archivos `*.html` utilizan sus directivas (ej. `v-on:click`, `v-show`, `:href`) basándose en los modelos y métodos declarados en sus respectivos `_.js`.
- **Bootstrap 5:** Todo el diseño, layout de componentes y clases utilitarias (`d-flex`, `mt-4`, modales de Bootstrap) son la base visual estándar.
- **Iconografía:** Controlada mediante `FontAwesome` (ej. `<i class="fa fa-folder"></i>`).
