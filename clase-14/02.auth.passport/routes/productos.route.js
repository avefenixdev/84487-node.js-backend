import express from 'express';
import productosController from '../controllers/productos.controller.js';
import isAuthenticated from '../middlewares/auth.middleware.js';

const routerProductos = express.Router();

// ! ---------------------- Rutas Productos
// ! Ruta que nos muestra el dashboard de todos los productos (zona privada)
routerProductos.get(
  '/productos',
  isAuthenticated,
  productosController.getAllProductos
);

// ! Ruta que nos muestra el dashboard de un solo producto (zona privada)
routerProductos.get(
  '/productos/:id',
  isAuthenticated,
  productosController.getOneProductos
);

export default routerProductos;
