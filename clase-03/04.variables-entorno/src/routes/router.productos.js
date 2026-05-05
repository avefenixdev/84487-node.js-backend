const express = require('express')
const productos = require("../../constants/productos")

// ! El Router en Express nos permite separar responsabilidades. 
// * Agrupar rutas relacionadas
// * Permite versionar APIs
// * Facilita el mantenimiento y el testeo
// * Evita duplicación de rutas
// * Es obligatorio si el proyecto tiene más de 250 líneas

const routerProductos = express.Router()

// ! CRUD COMPLETO
// ? R:READ - Verbo GET -> Obtener todos los recursos 
// ? Todos los usuarios http://localhost:8080/api/v1/productos
routerProductos.get('/api/v1/productos', (req, res) => {
    const { sort, order = 'asc' } = req.query
    //let resultado = productos // (copia) 2 variables apuntando a la misma caja
    let resultado = [...productos] // ¿Para qué hacemos esto? (clon) <--- objetos y arrays

    if (sort) {
      resultado.sort((a, b) => {
        if (order === 'desc') return (a[sort] < b[sort]) ? 1 : -1
        return a[sort] > b[sort] ? 1 : -1
      })
    }

    res.json(resultado)
})

// ? R:READ - Verbo GET -> Obtener un recurso
// ? Obtener un solo usuario http://localhost:8080/api/v1/productos/2

routerProductos.get('/api/v1/productos/:id', (req, res) => {
  const id = Number(req.params.id)
  const producto = productos.find(prod => prod.id === id)
  
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' })
  }

  res.json(producto)
})

// ? C:CREATE - Verbo POST -> Crear un recurso
routerProductos.post('/api/v1/productos', (req, res) => {
  // console.log(req.body)
  // El indentificador único lo genera el backend
  const {nombre, categoria, precio} = req.body

  if ( !nombre || !categoria || !precio ) {
    return res.status(400).json( { error: 'Faltan datos' })
  } 

  const nuevoProducto = {
    id: productos.length ? productos.at(-1).id + 1 : 1, 
    nombre,
    categoria,
    precio
  }

  console.log(nuevoProducto)

  productos.push(nuevoProducto)

  res.status(201).json(nuevoProducto)
})

// ? U:UPDATE - Verbo PUT -> Actualizar un recurso
// * El actualizar necesita la info que se está actualiando
// * Pero también necesita cual producto se está editando
routerProductos.put('/api/v1/productos/:id', (req, res) => {
  let { id } = req.params
  id = Number(id)
  const producto = req.body
  const index =  productos.findIndex(producto => producto.id === id)

  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' })
  }

  productos[index] = {
    ...productos[index],
    ...producto
  }

  res.json({
    producto: productos[index],
    msg: 'Se editó el producto...'
  })
})

// ? D:DELETE - Verbo DELETE -> Borrar un recurso
// * El eliminar necesita el id del producto al eliminar
routerProductos.delete('/api/v1/productos/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = productos.findIndex(producto => producto.id === id)

  if ( index === -1 ) {
    return res.status(404).json({ error: 'Producto no encontrado'})
  }

  const eliminado = productos.splice(index, 1)

  res.json({
    msg: 'Producto eliminado',
    producto: eliminado[0]
  })
})

module.exports = routerProductos