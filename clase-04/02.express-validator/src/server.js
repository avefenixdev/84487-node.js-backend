const express = require('express')
const path = require('node:path');

require('dotenv').config()
// ! Variables / Constantes

const app = express()
const PORT = process.env.PORT

// ! Middlewares

app.use(express.json())

const rutaSinArchivoServer = __dirname
const rutaAPublic = path.join(rutaSinArchivoServer, 'public')
app.use(express.static(rutaAPublic))

// ! Rutas

app.get('/bienvenido', (req, res) => {
    res.send('Bienvenido al servidor de Express')
})

app.post('/datos-contacto', (req, res) => {
    console.log(req.body)
    res.send('Listo')
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

