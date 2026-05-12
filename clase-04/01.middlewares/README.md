# Pasos para crear un proyecto NPM

1. Crear archivo 

```sh
touch server.js
``` 

2. Inicializar un proyecto NPM (Node)

```sh
npm init -y
```

3. Instalar nodemon como herramienta de desarrollo

```sh
npm i nodemon -D
```

4. Modificar el package.json, agregando el script desarrollo

```json
"scripts": {
    "dev": "nodemon src/server.js"
}
```

5. Abrir terminal y arrancar el servidor de desarrollo

```sh
npm run dev
```

6. Instalar Express

```sh
npm i express
```

7. Agregar el trabajo con variables de entorno

> Instalamos dotenv

<https://www.npmjs.com/package/dotenv>

```sh
npm i dotenv -D
```

> Creamos los archivos .env y .env.example

```sh
touch .env .env.example
```

> Importamos en el server.js la librería dotenv

```js
require('dotenv').config()
```

