import express from 'express';
import 'dotenv/config';
import routerAuth from './routes/auth.route.js';
import routerProductos from './routes/productos.route.js';

// ! Variables | Constantes
const app = express();
const PORT = process.env.PORT || 8888;

// ! Configuraciones

// ! Middlewares

// ! Rutas
app.use('/', routerAuth);
app.use('/', routerProductos);

// ! Arranque de la app

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
