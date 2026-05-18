const express = require('express')
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const path = require('node:path');
const storage = require('./config/multer');

require('dotenv').config()

// ! Variables y Constantes
const app = express()
const PORT = process.env.PORT
const RUTA = __dirname

// ! Configuraciones

// Configuración de cors
const corsOptions = {
  origin: process.env.FRONTEND,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// ! Middlewares
const upload = multer({ storage: storage })
const rutaAUploads = path.join(RUTA, '../uploads')
//console.log(rutaAUploads)
app.use(express.static(rutaAUploads))
// app.use(express.static('./uploads'))
// https://www.npmjs.com/package/cors
// Adds headers: Access-Control-Allow-Origin: * // ! <<---- todos los origines seran admitidos.
/* app.use(cors()) */
app.use(cors(corsOptions))

// ! Rutas
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/uploads', upload.single('archivo'), (req, res) => {
  //console.log(req.file) // Archivo guardado en el back

    // console.log(req.protocol) // protocolo -> http:// o https://
    // console.log(req.get('host')) // dominio:puerto | subdomino.dominio
    const protocolo = req.protocol
    const host = req.get('host')
    const urlArchivo = `${protocolo}://${host}/${req.file.filename}`
    console.log(urlArchivo)
    res.json(
      { 
        ok: true,
        url: urlArchivo
      }
    )
})

// ! El Arranque
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
