const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
const path = require('node:path');
const RUTA = __dirname

const rutaAUploads = path.join(RUTA, '../../uploads')
//console.log(rutaAUploads)

const storage = multer.diskStorage({
  /* Carpeta donde va a guardarse los recursos */
  destination: function (req, file, cb) {
    cb(null, rutaAUploads)
  },
  /* Nombre del archivo */
  filename: function (req, file, cb) {
    console.log(file)
    const array = file.originalname.split('.')
    const extension = array.at(-1)
    console.log(extension)
    //const extension2 = array[array.length-1]
    //console.log(extension2)
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const nombreArchivo = `${uuidv4()}.${extension}`
    cb(null, nombreArchivo)
  }
})

module.exports = storage