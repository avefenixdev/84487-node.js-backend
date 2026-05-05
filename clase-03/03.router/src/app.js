const express = require('express')
const productos = require('../constants/productos')
const routerProductos = require('./routes/router.productos')

const app = express()

// ! Middleware
app.use(express.json()) 

// ! Router
app.use('/', routerProductos)

app.all('/{*splat}', (req, res) => {
  //console.log(req.method)
  const metodo = req.method
  const laRuta = req.url
  res.status(404).send(`La ruta: ${laRuta} con el método ${metodo} no es valida`)
})

module.exports = app
