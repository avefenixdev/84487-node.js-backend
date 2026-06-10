import express from 'express'
import 'dotenv/config'

// ! Variables | Constantes
const app = express()
const PORT = process.env.PORT || 8888

// ! Configuraciones

// ! Middlewares

// ! Rutas

// ! ---------------------- Rutas Usuarios

// ! Ruta donde recibo la info de logueo (correo, password)
app.post('/login', (req, res) => {
    res.send('login')
})
// ! Ruta donde recibo la info de register ( nombre, correo, password, confirm-password )
app.post('/register', (req, res) => {
    res.send('register')
})
// ! Ruta deslogueo de usuario
app.get('/logout', (req, res) => {
    res.send('logout')
})


// ! ---------------------- Rutas Usuarios
// ! Ruta que nos muestra el dashboard de todos los productos (zona privada)
app.get('/productos', (req, res) => {
    res.send('Todos los productos')
})
// ! Ruta que nos muestra el dashboard de un solo producto (zona privada)
app.get('/productos/:id', (req, res) => {
    res.send('Un solo producto')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// ! Arranque de la app

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})