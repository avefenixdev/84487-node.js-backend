const { validationResult } = require("express-validator")

const datosContactoMiddleware = (req, res, next) => {
    //console.log(req) // <----------- las marcas que dejan los check
    const errores = validationResult(req)
    //console.log(errores)
    if ( !errores.isEmpty() ) {
        return res.status(400).json( errores )
    }
    next()
}

module.exports = datosContactoMiddleware