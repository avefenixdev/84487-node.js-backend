const express = require('express')
const path = require('node:path');

const validarToken = require('./middlewares/validar-token')
require('dotenv').config()
// ! Variables / Constantes

const app = express()
const PORT = process.env.PORT

// ! Middlewares

/* 
¿Qué es Middleware? Un middleware es una función que se ejecutan antes de que la solicitud llegue a la ruta final o antes de que se envíe la respuesta. Permiten agregar funcionalidades, validaciones, autenticaciones, logs y manejo de errores
*/
// * Verificar si el usuario está autenticado
// * Validar datos del req.body
// * Agregar información (modificar el request)
// * Registrar logs de acceso
// * Manejar errores globales
// * Limitar el acceso por IP, rol, token, etc
// ! Middlewares de aplicación (Todas las rutas van a pasar por estos middlewares)

// Middlewares buildin (Dentro de la librería de express)
app.use(express.json()) // Para que express entienda los json que vienen dentro de la petición
// Static -> Le digo a express que el directorio public va ser de acceso público. Todos los clientes van a poder acceder.
// ---------------------------
console.log(__filename) // el archivo que se ejecutando
console.log(__dirname) // el directorio donde el archivo se está ejecutando
console.log(`${__dirname}\\public`) // No recomendable
const rutaSinArchivoServer = __dirname
const rutaAPublic = path.join(rutaSinArchivoServer, 'public')
console.log(rutaAPublic) // Forma correcta
// ---------------------------
app.use(express.static(rutaAPublic))

// Middlewares que utilizan con app.use()
// Middleare que nos loguea a que hora y fecha ingreso a esa ruta
app.use((req, res, next) => {
    console.log('-------------------------')
    console.log(new Date().toLocaleString())
    console.log('-------------------------')
    /* res.send(`No dejo ir a la ruta ${req.url}`) */
    next()
})

// Middleware de detección de rol administrador
// Query String -> Cadena de consulta (URL)
// ?nombre=Maxi&&rol=admin

const soloAdministradores = (req, res, next) => {
    console.log(req.query) // Un objeto con las variables dentro de la Query String
    console.log(req.query.rol)
    if ( req.query.rol === 'admin') {
        console.log('Todo salió bien')
        next()
    } else {
       /*  console.log('No se pudio...')
        res.status(403).send('Acceso denegado') */ // El servidor recibió la petición pero la rechaza
        const error = {
            status: 403,
            mensaje: 'Acceso denegado'
        }
        next(error)
    }
}


//app.use(soloAdministradores)

// ! Rutas

app.get('/bienvenido', (req, res) => {
    res.send('Bienvenido al servidor de Express')
})

/* app.get('/admin-panel', validarToken, soloAdministradores, (req, res) => {
    res.send('Área restrigida!')
}) */
// ! Middlewares de rutas 
const arrayMiddlewares = [validarToken, soloAdministradores]

app.get('/admin-panel', arrayMiddlewares, (req, res) => {
    res.send('Área restrigida!')
})

// ! Middleware de manejo de error (Siempre al final)

const errorHandler = (err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).json(
        {
            mensaje: err.mensaje || 'Error interno del servidor'
        }
    )
}

app.use(errorHandler)

// ! Arranque

app.listen(PORT, (error) => {
    if(error) throw new Error(`El servidor no pudo arrancar: ${error}`)
    console.log(`El servidor está funcionando en http://localhost:${PORT}`)
})

