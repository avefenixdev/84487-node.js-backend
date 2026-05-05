const express = require('express')
const app = express()
const PORT = 8080

// ! Middleware
app.use(express.json()) // Cuando se recibe información a través de un JSON tengo que poner este middleware

// ! CRUD COMPLETO
// ? R:READ - Verbo GET -> Obtener todos los recursos 
// ? Todos los usuarios http://localhost:8080/api/v1/usuarios
app.get('/api/v1/usuarios', (req, res) => {
    //console.log(req.query)
    const { sort, order } = req.query
    // console.log(req) el objeto que representa una petición (request) del protocolo http
    // console.log(res) el objeto que representa una respuesta (response) del protocolo http
    res.send(`Me devuelve todos los usuarios ordenados por ${sort} y en dirección ${order}`) 
})

// ? R:READ - Verbo GET -> Obtener un recurso
// ? Obtener un solo usuario http://localhost:8080/api/v1/usuarios/2
// * Es recibir por parametros el identificador del recurso que queremos obtener
app.get('/api/v1/usuarios/:id', (req, res) => {
  //console.log(rºeq.params.id) 
  const id = req.params.id
  res.send(`Obteniendo el usuario con id: ${id}`)
})

/* app.get('/{*splat}', (req, res) => {
  res.status(404).send('Ruta GET no encontrada')
}) */

// ? C:CREATE - Verbo POST -> Crear un recurso
app.post('/api/v1/usuarios', (req, res) => {
  // console.log(req.body)
  const usuario = req.body
  res.status(201).json(usuario)
})

/* app.post('/{*splat}', (req, res) => {
  res.status(404).send('Ruta POST no encontrada')
}) */

// ? U:UPDATE - Verbo PUT -> Actualizar un recurso
// * El actualizar necesita la info que se está actualiando
// * Pero también necesita cual usuario se está editando
app.put('/api/v1/usuarios/:id', (req, res) => {
  const { id } = req.params
  const usuario = req.body
  console.log(usuario)
  // Nos faltó recibir en el cuerpo de la petición (body) el usuario con los valores editados
  res.json({
    id,
    usuario,
    msg: 'Se está editando el usuario...'
  })
})

// ? D:DELETE - Verbo DELETE -> Borrar un recurso
// * El eliminar necesita el id del usuario al eliminar
app.delete('/api/v1/usuarios/:id', (req, res) => {
  const id = req.params.id
  res.send(`Se va borrar el usuario con el id: ${id}`)
})

app.all('/{*splat}', (req, res) => {
  //console.log(req.method)
  const metodo = req.method
  const laRuta = req.url
  res.status(404).send(`La ruta: ${laRuta} con el método ${metodo} no es valida`)
})

app.listen(PORT, (error) => {
  if (error) {
    throw new Error(`El servidor no está pudiendo arrancar ${error}`)
  }
  console.log(`El servidor arrancó en: http://localhost:${PORT}`)
})

