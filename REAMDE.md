# Sistema de Archivos Privados

`cf.archivosprivados` es un componente del [**proyecto Trascender**](https://github.com/jotacalderon90/), encargado de la **gestión, almacenamiento y acceso controlado a archivos privados** dentro del ecosistema.

Su propósito es permitir que las aplicaciones manejen archivos sensibles o restringidos de forma **segura, desacoplada y consistente**, evitando accesos directos o exposiciones indebidas.

---

## Rol dentro del ecosistema

Mientras `cf.archivospublicos` expone recursos accesibles libremente, `cf.archivosprivados` gestiona **archivos protegidos**.

Este servicio actúa como una capa común que permite:

* Almacenamiento seguro de archivos
* Control de acceso basado en identidad (`cf.account`)
* Entrega controlada de recursos
* Separación entre almacenamiento y lógica de negocio

De esta forma, las aplicaciones no acceden directamente a archivos sensibles, sino que delegan esta responsabilidad en un servicio especializado.

---

## Propósito

Este sistema busca:

* Centralizar la gestión de archivos privados
* Proteger información sensible
* Evitar exposición accidental de recursos
* Facilitar integración entre múltiples servicios
* Permitir escalabilidad en almacenamiento y acceso

---

## Principios

* **Privacidad por defecto:** Todo archivo es considerado restringido
* **Acceso controlado:** Todo acceso requiere validación de identidad
* **Desacoplamiento:** Las aplicaciones no interactúan directamente con el almacenamiento
* **Trazabilidad:** Posibilidad de auditar accesos y operaciones

---

## Capacidades

Este servicio contempla:

* Subida de archivos
* Descarga controlada de archivos
* Validación de permisos antes de cada acceso
* Integración con `cf.account` para autenticación
* Organización lógica de archivos

---

## Integración con identidad

`cf.archivosprivados` depende de `cf.account` para:

* Validar usuarios
* Determinar permisos de acceso
* Restringir recursos según contexto

Esto garantiza que el acceso a los archivos esté alineado con la identidad y permisos definidos en el ecosistema.

---

## Tecnologías

### Backend

* Node.js
* Express (a través de `cf.framework`)
* Zod (validaciones)
* Express File Upload

---

## Ejecución local

> Este servicio sigue la misma arquitectura de red utilizada en el ecosistema.

---

### Con Node.js

```bash
npm install
npm run dev
```

Para producción:

```bash
npm run start
```

---

### Con Docker

Modo desarrollo:

```bash
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
```

Modo producción:

```bash
docker-compose build
docker-compose up
```

---

## Notas

* Este repositorio es un servicio central dentro del ecosistema
* Maneja información potencialmente sensible
* Está diseñado para integrarse con `cf.account`
* Se complementa directamente con `cf.archivospublicos`

---

## Continuidad del ecosistema

Este servicio se apoya en la infraestructura de recursos públicos y además complementa su gestión:

[https://github.com/jotacalderon90/cf.archivospublicos](https://github.com/jotacalderon90/cf.archivospublicos)

Y se integra directamente con el sistema de identidad:

[https://github.com/jotacalderon90/cf.account](https://github.com/jotacalderon90/cf.account)

El siguiente componente del ecosistema corresponde a la gestión de la base de datos:

[https://github.com/jotacalderon90/cf.database](https://github.com/jotacalderon90/cf.database)
