# Cookies

Es información que se almacena en el formato clave-valor que el navegador guarda y envía automaticamente al servidor a través del protocolo http.

Para poder gestionar las cookies vamos a utilizar un middleware. El middleware se llama cookie-parser. Solo las lee y las procesa para obtener la información.

## cookie-parser

<https://www.npmjs.com/package/cookie-parser>

1. Instalar

```sh
npm i cookie-parser
``` 

2. Importar

```js
import cookieParser from 'cookie-parser'
```

3. Utilizo

```js
app.use(cookieParser())
```

# Sesiones
Una sesión es un aestado en el servidor, identificado por un ID (SID) que el cliente guardar (generalmente en una cookie). La sesión creada por el backend se almacena en la DB en una tabla en especifico. Por defecto se guarda en en memoria pero puedo cambiar ese comportamiento agregando un Store diferente.

## express-session

<https://www.npmjs.com/package/express-session>

```sh
npm i express-session
```
