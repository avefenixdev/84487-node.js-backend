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
const mensajes = [
  { usuario: 'Pedro', mensaje: 'Hola! que tal!' },
  { usuario: 'Alfredo', mensaje: 'Muy bien y vos?' },
  { usuario: 'Natalia', mensaje: 'Genial' },
  { usuario: 'Laura', mensaje: 'Todo feten feten' },
];

// ! Configuraciones
// * Agrego la librería socket.io
const server = createServer(app);
const io = new Server(server);

// ! Middlewares
app.use(express.json()); // Me decodifica el body cuando llega a través de un json
app.use(express.static(path.join(DIRNAME, 'public')));
//console.log(path.join(DIRNAME, 'public'));
// orientado a eventos
// addEventListner('evento', callback) // callback -> una función pasada como argumento
io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado!', socket.id);
  });

  const userId = socket.handshake.auth;
  console.log('Usuario:', userId, 'Socket:', socket.id);

  // Emitir mensajes desde el servidor al cliente!
  socket.emit('nombre', 'Maximiliano');
  socket.emit('clientes', [
    { id: 1, nombre: 'Sabrina' },
    { id: 2, nombre: 'Lautaro' },
    { id: 3, nombre: 'Juan' },
  ]);
  // Recibiendo mensajes
  socket.on('is-active', (booleano) => {
    console.log(booleano);
  });

  // Emitiendo mensajes al cliente
  socket.emit('mensajes', mensajes);

  // Recibir el mensaje
  socket.on('nuevo-mensaje', (nuevoMensaje) => {
    console.log(nuevoMensaje);
    mensajes.push(nuevoMensaje);
    console.log(mensajes);
    io.sockets.emit('mensajes', mensajes);
  });
});

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
    //await mongoose.connect(STRING_CONEXION);
    console.log('Conexión a DB establecidad correctamente');
    console.timeEnd('Tiempo para conectarse a la DB');
  } catch (error) {
    console.log('No se pudo conectar', error);
  }
});
