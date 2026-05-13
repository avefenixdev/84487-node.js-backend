const express = require('express');
const { check, validationResult } = require('express-validator');
const path = require('node:path');

const datosContactoValidators = require('./validators/datos-contacto.validators');

require('dotenv').config()
// ! Variables / Constantes

const app = express()
const PORT = process.env.PORT

// ! Middlewares

app.use(express.json()) // Entender lo que llega a través de un JSON
app.use(express.urlencoded({extended: false})) // Entender lo que viene a través de un formulario HTML

const rutaSinArchivoServer = __dirname
const rutaAPublic = path.join(rutaSinArchivoServer, 'public')
app.use(express.static(rutaAPublic))

// ! Rutas

app.get('/bienvenido', (req, res) => {
    res.send('Bienvenido al servidor de Express')
})

/* app.post('/datos-contacto-manual', (req, res) => {
    console.log(req.body)
    const error = []

    const {name, lastname, age} = req.body

    if(!name) {
      //return res.status(400).json({ error: 'El nombre es requerido'})
      error.push({error: 'El nombre es requerido'})
    }

    if(!lastname) {
      //return res.status(400).json({ error: 'El apellido es requerido'})
      error.push({error: 'El apellido es requerido'})
    }

    if(!age) {
      //return res.status(400).json({ error: 'El edad es requerido'})
      error.push({error: 'El edad es requerido'})
    }

    if(error.length > 0) {
      return res.status(400).json({ error })
    }

    res.status(201).json({ mensaje: 'Todo Okey', nombre: name, apellido: lastname, edad: age })
}) */
// https://github.com/validatorjs/validator.js
// Middleware de ruta -> Express Validator -> https://express-validator.github.io/docs
// https://express-validator.github.io/docs/api/validation-chain/
/* app.post('/datos-contacto-express-validator',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('name', 'Debe tener mínimo 3 caracteres y máximo 12 caracteres').isLength({ min:3 , max: 12}),
        check('lastname', 'El apellido es obligatorio').notEmpty(),
        check('age', 'La edad es obligatoria y debe ser mayor de edad. Entre 18 y 99').notEmpty().isInt({ min: 18, max: 99}),
        check('email', 'El correo es obligatorio').notEmpty(), 
        check('email', 'El correo es inválido').isEmail(), 
        (req, res, next) => {
            //console.log(req) // <----------- las marcas que dejan los check
            const errores = validationResult(req)
            //console.log(errores)
            if ( !errores.isEmpty() ) {
                return res.status(400).json( errores )
            }
            next()
        }
    ] 
    ,(req, res) => {
        console.log(req.body)
        


    res.json({ mensaje: 'Todo Okey', data: req.body})
}) */

app.post('/datos-contacto', datosContactoValidators, (req, res) => {
    console.log(req.body)
    res.json({ mensaje: 'Todo Okey', data: req.body})
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

