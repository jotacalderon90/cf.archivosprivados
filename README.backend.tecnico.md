# Documentación Técnica del Backend

Este documento describe la arquitectura, estructura de archivos y convenciones utilizadas en la capa backend de la aplicación. Está diseñado como una guía técnica de referencia para desarrolladores e Inteligencias Artificiales.

## 1. Arquitectura de Enrutamiento en Cascada (`router.0#.js`)

El backend utiliza un sistema de enrutamiento basado en archivos numerados secuencialmente en la raíz de la carpeta `backend/` (ej. `router.01.default.js`, `router.02.views.js`, `router.05.file.js`). 

**Propósito:**
- **Orden de Carga:** El prefijo numérico (`01`, `02`, etc.) asegura un orden determinista y en cascada al momento de inicializar y registrar los endpoints en el servidor.
- **Agrupación:** Cada archivo de enrutamiento consolida las rutas correspondientes a un dominio específico de la aplicación y exporta un objeto donde cada propiedad corresponde a un endpoint.
- **Desacoplamiento:** Los archivos de enrutamiento se limitan a definir la metadata de las rutas (mediante comentarios y anotaciones) y a mapearlas directamente con los métodos del controlador correspondiente, manteniendo la definición separada de la lógica.

## 2. Anotaciones de Rutas (Metadata y Swagger)

La metadata de los endpoints se define sobre cada propiedad exportada en el router mediante comentarios especiales. El framework interno lee e interpreta estas anotaciones dinámicamente:

*   `/** @swagger ... */`: Documentación del endpoint bajo la especificación OpenAPI. Describe paths, parámetros, headers, tags y esquemas de respuesta. Esta anotación se utiliza para autogenerar la documentación de la API. En el caso del uso de roles se agrega un atributo custom `x-roles: [...]`.
*   `//@route('/path')`: Define el path (URL) del endpoint. Admite parámetros de ruta dinámicos de Express (ej. `/api/file/:id`).
*   `//@method(['get', 'post'])`: Define una matriz de métodos HTTP aceptados por el endpoint.
*   `//@roles(['admin', 'usuario'])`: Define un arreglo de roles permitidos para la autorización (Role-Based Access Control - RBAC).

**Ejemplo de implementación:**
```javascript
/**
 * @swagger
 * /api/ejemplo/:id:
 *   get: ...
 */
//@route('/api/ejemplo/:id')
//@method(['get'])
//@roles(['admin'])
read: controlador.read, // Puntero a la función en el controlador local
```

## 3. Estructura Modular (`lib/modulo/`)

La lógica de la aplicación se divide en módulos independientes ubicados en `backend/lib/[modulo]/` (por ejemplo, `lib/05.file/`). Cada uno de estos módulos sigue un patrón estructurado que separa responsabilidades en cuatro capas principales:

*   **`controller.js`**: Capa de presentación. Recibe los objetos `req` y `res`, extrae parámetros/body, coordina la validación con `validator.js`, llama a la lógica de negocio en `service.js` y retorna la respuesta HTTP final al cliente.
*   **`validator.js`**: Capa de validación de entrada. Generalmente utiliza librerías de esquemas (como `Zod`) para sanitizar y garantizar la integridad de los datos entrantes (ej. params, queries o bodies).
*   **`service.js`**: Capa de lógica de negocio o de infraestructura. Ejecuta operaciones pesadas, manipulación de archivos, o interacciones con bases de datos. No debe depender de los objetos de Express (`req`/`res`).
*   **`constants.js`**: Almacena constantes, enumeraciones o configuraciones estáticas exclusivas del módulo.

## 4. Librerías Base / Padres (`lib/*.js`)

En la raíz del directorio `lib/` (junto a las carpetas de los módulos) se encuentran archivos JavaScript (`*.js`) que actúan como librerías globales, clases padre o dependencias compartidas para el resto de los módulos. 

Por ejemplo:
*   **`validator.js` (Global)**: Define esquemas de validación reutilizables (ej. validaciones de cadenas en base64 comunes usando `Zod`) que pueden ser extendidos por los validadores específicos de cada módulo.
*   **`filemanager.js` (Global)**: Expone utilidades transversales (por ejemplo, resolución de rutas base de archivos combinando variables de entorno o de proceso).
*   **`constants.js` (Global)**: Concentra variables de entorno globales, estados de aplicación, y otras definiciones que todo el backend necesita conocer.

---
**Resumen de la relación:**
1. Servidor lee secuencialmente -> `router.0#.js`.
2. `router.0#.js` extrae metadata (`@route`, `@method`, `@roles`) y enruta hacia -> `lib/[modulo]/controller.js`.
3. `controller.js` valida entrada con -> `lib/[modulo]/validator.js` (el cual puede heredar de `lib/validator.js`).
4. `controller.js` pasa el control a -> `lib/[modulo]/service.js` para resolver el requerimiento.
5. `controller.js` devuelve la respuesta.
