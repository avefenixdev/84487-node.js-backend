import express from 'express';
import productosController from '../controllers/productos.controller.js';

const routerProductos = express.Router();

// ! ---------------------- Rutas Productos
// ! Ruta que nos muestra el dashboard de todos los productos (zona privada)
routerProductos.get('/productos', productosController.getAllProductos);

// ! Ruta que nos muestra el dashboard de un solo producto (zona privada)
routerProductos.get('/productos/:id', productosController.getOneProductos);

export default routerProductos;
