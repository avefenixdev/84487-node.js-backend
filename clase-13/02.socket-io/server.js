import express from 'express';
import 'dotenv/config';
import routerAuth from './routes/auth.route.js';
import routerProductos from './routes/productos.route.js';
import mongoose from 'mongoose';

// ! Variables | Constantes
const app = express();
const PORT = process.env.PORT || 8888;
const STRING_CONEXION = process.env.STRING_CONEXION;
const SECRET = process.env.SECRET;
// ! Configuraciones

// ! Middlewares
app.use(express.json()); // Me decodifica el body cuando llega a través de un json

// ! Rutas
app.use('/', routerAuth);
app.use('/', routerProductos);

app.get('/', (req, res) => {
  res.send('Página principal');
});

// ! Arranque de la app

app.listen(PORT, async () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
  try {
    console.time('Tiempo para conectarse a la DB');
    await mongoose.connect(STRING_CONEXION);
    console.log('Conexión a DB establecidad correctamente');
    console.timeEnd('Tiempo para conectarse a la DB');
  } catch (error) {
    console.log('No se pudo conectar', error);
  }
});
