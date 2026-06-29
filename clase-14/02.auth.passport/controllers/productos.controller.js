import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import modelo from '../models/productos.model.js';

const obtenerPagina = async (view, data = {}) => {
  console.log(__dirname);
  const rutaALaPagina = path.join('views', 'pages', view + '.ejs');
  console.log(rutaALaPagina);
  return ejs.renderFile(rutaALaPagina, data); // Devolverme la plantilla ya renderizada
};

const getAllProductos = async (req, res) => {
  try {
    const productos = await modelo.getAllProductos();
    const body = await obtenerPagina('productos', { productos }); // nuevo obj y dentro pasar lo que necesite
    res.render('layout', { titulo: 'Listado Productos', body });
  } catch (error) {}
};

const getOneProductos = (req, res) => {
  res.send('Un solo producto');
};

export default {
  getAllProductos,
  getOneProductos,
};
