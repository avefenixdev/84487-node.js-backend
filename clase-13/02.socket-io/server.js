import express from 'express';
import 'dotenv/config';
import routerAuth from './routes/auth.route.js';
import routerProductos from './routes/productos.route.js';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';

// ! Variables | Constantes
const app = express();
const PORT = process.env.PORT || 8888;
const STRING_CONEXION = process.env.STRING_CONEXION;
const SECRET = process.env.SECRET;
const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(FILENAME);
// console.log(FILENAME);
// console.log(DIRNAME);

// ! Configuraciones
// * Agrego la librería socket.io
const server = createServer(app);
const io = new Server(server);

// ! Middlewares
app.use(express.json()); // Me decodifica el body cuando llega a través de un json
app.use(express.static(path.join(DIRNAME, 'public')));
//console.log(path.join(DIRNAME, 'public'));

// ! Rutas
app.use('/', routerAuth);
app.use('/', routerProductos);

app.get('/', (req, res) => {
  res.send('Página principal');
});

// ! Arranque de la app
// * El servidor creado con createServer() es el que se va a poner a escuchar para que funcione socket.io
server.listen(PORT, async () => {
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
