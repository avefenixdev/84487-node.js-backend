import express from 'express';
import 'dotenv/config';
import routerAuth from './routes/auth.route.js';
import routerProductos from './routes/productos.route.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './utils/handle-passport.js';
import { fileURLToPath } from 'url';
import path from 'path';
import ejs from 'ejs';

// ! Variables | Constantes
const app = express();
const PORT = process.env.PORT || 8888;
const STRING_CONEXION = process.env.STRING_CONEXION;
const SECRET = process.env.SECRET;
const __filename = fileURLToPath(import.meta.url); // La ruta absoluta que incluye el nombre del archivo
const __dirname = path.dirname(__filename); // La ruta absoluta al proyecto de node
// ! Configuraciones
app.set('view engine', 'ejs'); // Le indico por medio de una variable que motor de plantillas voy a usar

app.set('views', path.join(__dirname, 'views')); // Ruta a donde va a ir a buscar las plantillas
app.set('layout', 'layout'); // Le indico donde van a estar los layouts

// ! Middlewares
app.use(express.static(path.join(__dirname, 'public'))); // Ruta a donde va a ir a buscar las plantillas

app.use(express.json()); // Me decodifica el body cuando llega a través de un json
// ! Middleware de Cookies
app.use(cookieParser()); // Decodificar las cookies que nos lleguen desde el cliente
// ! Middleware de Session
// ! Sesiones
// * secret -> cadena de caracteres que se va a usar para generar sesiones ->  Esto va dentro de una variable de entorno -> secret es una semilla que me va permitir generar un sid único para mi servidor
// * resave -> false (recomendado) -> Permite indica si se va a estar guardando cada vez que se haga una petición.
// * saveUninitialized -> false (recomendado) -> Ni bien crea sesión, si crea vacía no la guardo.
// * cookie. Controla que la cookie sea segura.
// * store: Permite especificar donde se van a guardar las sesiones creadas. Por defecto si no le coloco, guarda en memoria.
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    /* cookie: { secure: true } */
    store: MongoStore.create({ mongoUrl: STRING_CONEXION }),
  })
);
// ! Middleware de Passport
app.use(passport.initialize());
app.use(passport.session());

// ! Rutas
app.use('/', routerAuth);
app.use('/', routerProductos);

const obtenerPagina = async (view, data = {}) => {
  const rutaALaPagina = path.join(__dirname, 'views', 'pages', view + '.ejs');
  console.log(rutaALaPagina);
  return ejs.renderFile(rutaALaPagina, data); // Devolverme la plantilla ya renderizada
};

app.get('/', async (req, res) => {
  const body = await obtenerPagina('home');
  res.render('layout', { titulo: 'Inicio', body });
});

app.get('/contacto', async (req, res) => {
  const body = await obtenerPagina('contacto');
  res.render('layout', { titulo: 'Contacto', body });
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
