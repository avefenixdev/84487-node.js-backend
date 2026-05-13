const { check } = require("express-validator")
const datosContactoMiddleware = require("../middlewares/datos-contacto.middleware")

const datosContactoValidators = [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('name', 'Debe tener mínimo 3 caracteres y máximo 12 caracteres').isLength({ min:3 , max: 12}),
        check('lastname', 'El apellido es obligatorio').notEmpty(),
        check('age', 'La edad es obligatoria y debe ser mayor de edad. Entre 18 y 99').notEmpty().isInt({ min: 18, max: 99}),
        check('email', 'El correo es obligatorio').notEmpty(), 
        check('email', 'El correo es inválido').isEmail(), 
        datosContactoMiddleware
]

module.exports = datosContactoValidators