import mongoose from 'mongoose';

const UsuarioEsquema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
//                                  (collección, cuales van a ser los field del documento)
const UsuarioModelo = mongoose.model('usuarios', UsuarioEsquema);

export default UsuarioModelo;
