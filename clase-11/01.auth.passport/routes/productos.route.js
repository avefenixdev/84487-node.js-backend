import express from 'express';
const routerProductos = express.Router();

// ! ---------------------- Rutas Productos
// ! Ruta que nos muestra el dashboard de todos los productos (zona privada)
routerProductos.get('/productos', (req, res) => {
  res.send('Todos los productos');
});
// ! Ruta que nos muestra el dashboard de un solo producto (zona privada)
routerProductos.get('/productos/:id', (req, res) => {
  res.send('Un solo producto');
});

export default routerProductos;
