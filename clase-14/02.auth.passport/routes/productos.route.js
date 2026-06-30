import express from 'express';
import productosController from '../controllers/productos.controller.js';
import isAuthenticated from '../middlewares/auth.middleware.js';

const routerProductos = express.Router();

// ! ---------------------- Rutas Productos
// ! Ruta que nos muestra el dashboard de todos los productos (zona privada)
routerProductos.get('/productos', productosController.getAllProductos);

// ! Ruta que nos muestra el dashboard de un solo producto (zona privada)
routerProductos.get('/productos/:id', productosController.getOneProductos);

// ! ---------------------- Rutas Privadas a Productos (Dashboard)

routerProductos.get('/dashboard', productosController.getAllProductosPrivado);

routerProductos.get('/create-formu', productosController.showCreateFormu);

routerProductos.post('/create-formu', productosController.saveProduct);

export default routerProductos;
