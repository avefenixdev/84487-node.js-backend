import mongoose from 'mongoose';

const ProductosEsquema = new mongoose.Schema(
  {
    nombre: {
      type: String,
    },
    categoria: {
      type: String,
    },
    stock: {
      type: Number,
    },
    codigo: {
      type: String,
    },
    precio: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductosModelo = mongoose.model('productos', ProductosEsquema);

const getAllProductos = async () => {
  try {
    const todosLosProductos = await ProductosModelo.find();
    return todosLosProductos;
  } catch (error) {
    throw error;
  }
};

const createProducto = async (nuevoProducto) => {
  try {
    await ProductosModelo.create(nuevoProducto);
  } catch (error) {
    throw error;
  }
};

export default {
  getAllProductos,
  createProducto,
};
