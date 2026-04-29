# Clase 01 - Node.JS Backend

## Express.js 
Es un frameworks de desarrollo web para Node.js que se usa para crear aplicaciones y APIs de forma rápida y sencilla

<https://expressjs.com/>

```sh
npm i express
```

## Al hacer el comando anterior se van a crear y modificar los siguientes archivos

* package.json -> Las dependencias y Scripts
* package.lock.json -> Son las depedencias de las dependencias para que si borro los node_modules puedo gracias al package.lock.json recuperar todo de una manera más ágil
* node_modules/ -> Carpeta donde voy a encontrar todas las dependencias del proyecto. (No subo, ni guardo dentro de un repositorio la carpeta node_modules/)

## Instalar dependencias

```sh
npm i # crea la carpeta node_modules/
```

# Clase 02 - Node.JS Backend

## Repaso

### Inicializamos un proyecto NPM

Nota: Si creamos antes de inicializar un proyecto NPM el archivo **server.js**

```sh
npm init -y
``` 

## NPM.js (Express)

<https://www.npmjs.com/package/express>

## Protocolo HTTP (Verbos o métodos)

* GET: obtener recursos
* POST: Crear un recurso
* PUT o PATCH: Editar un recurso
* DELETE: Borrar un recurso

## CRUD

* C:CREATE -> POST
* R:READ -> GET
* U:UPDATE -> PUT o PATCH
* D:DELETE -> DELETE