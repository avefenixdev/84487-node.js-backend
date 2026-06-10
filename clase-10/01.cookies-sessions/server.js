// commonjs -> require/ module.export
// module -> ECMA Script module -> import y export
import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app = express()
const PORT = process.env.PORT || 8888

// ! Middlewares
// ? Cookies
app.use(cookieParser())

// ? Express Session

// * secret -> cadena de caracteres que se va a usar para generar sesiones ->  Esto va dentro de una variable de entorno -> secret es una semilla que me va permitir generar un sid único para mi servidor
// * resave -> false (recomendado) -> Permite indica si se va a estar guardando cada vez que se haga una petición.
// * saveUninitialized -> false (recomendado) -> Ni bien crea sesión, si crea vacía no la guardo.
// * cookie. Controla que la cookie sea segura.
// * store: Permite especificar donde se van a guardar las sesiones creadas. Por defecto si no le coloco, guarda en memoria.


app.use(session({
  name: 'sid', // nombre de la clave que se va a crear para almacenar el valor (el indentificador)
  secret: 'clave-ultra-secreta',
  resave: false, // no rescribir si no cambió
  saveUninitialized: false, // no se crean sesiones vacías,
  cookie: {
    httpOnly: true,
    secure: false, // true SOLO con HTTPS // http://localhost:8080/
    maxAge: 1000 * 60 * 60 // 1 hora
  }
}))



app.get('/', (req, res) => {
  res.send('Hola mundo!')
})

app.get('/set-cookie', (req, res) => {
    res.cookie('nombre', 'Maxi')
    res.cookie('modo', 'dark')
    res.send('Te envío una cookie')
})

app.get('/get-cookies', (req, res) => {
    console.log(req.cookies)
    res.send('Cookies recibidas')
})


// ! ---------------------------------------
// ! SESIONES ------------------------------
// ! ---------------------------------------
let contadorSinSesion = 0

app.get('/sin-sesion', (req, res) => {
  res.json({ contador: ++contadorSinSesion })
})

app.get('/con-sesion', (req, res) => {

  console.log(req.sesion)

  // Variable de sesión
  /* req.session.contador = 1 */

  if (req.session.contador) {
    // Si existe
    req.session.contador++
    res.json({ mensaje: `Usted ha visitado el sitio ${req.session.contador} veces`})
  } else {
    // si no existe
    req.session.contador = 1
    res.json({ mensaje: 'Bienvenido!'})
  }

})

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
