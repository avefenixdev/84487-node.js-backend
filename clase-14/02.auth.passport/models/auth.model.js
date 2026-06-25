import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

// Métodos que van a estar dentro del modelo disponibles

UsuarioEsquema.methods.encriptarPassword = async (password) => {
  try {
    // Tenemos diferentes tipos de algoritmos de hasheo (encriptación)
    // Simple vía -> Una vez hasheado, no se puede recuperar el valor original -> 123456 -> Nunca más voy a ver ese valor -> (bcrypt)
    // Doble vía -> Un vez hasheado, puedo deshashar y recuperar el valor original.
    const salt = await bcrypt.genSalt(10); // Semilla ( SaltRound -> Factor de Coste ) A Mayor valor, más tiempo y costo de procesamiento para generar la semilla
    const passwordEncriptado = await bcrypt.hash(password, salt);
    return passwordEncriptado;
  } catch (error) {
    throw error;
  }
};

UsuarioEsquema.methods.comprobarPassword = async function (passwordLogin) {
  // this -> a los datos del modelo
  try {
    // passwordLogin -> llego desde el formulario de logueo (No encriptado)
    // this.password -> al password guardado en la instancia de creación del usuario (Encriptado)
    const resultadoComprobacion = await bcrypt.compare(
      passwordLogin,
      this.password
    );
    // Si el compare, devuelve true -> Quiere decir que el usuario existe y la constraseña coincide con la contraseña que está DB
    return resultadoComprobacion;
  } catch (error) {
    throw error;
  }
};

const UsuarioModelo = mongoose.model('usuarios', UsuarioEsquema);

const getByCorreo = async (correo) => {
  try {
    const usuario = await UsuarioModelo.findOne({ correo });
    // console.log(usuario);
    return usuario;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const chequearPassword = async (usuario, passwordLogin) => {
  try {
    const esCorrecto = await usuario.comprobarPassword(passwordLogin);
    return esCorrecto; // true o false
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const usuario = await UsuarioModelo.findById(id);
    return usuario; // Si existe me deuvelve el usuario sino me devuelve null
  } catch (error) {
    throw error;
  }
};

const createUser = async (nombre, correo, password) => {
  try {
    const usuarioPorCrear = new UsuarioModelo({
      nombre,
      correo,
      password,
    }); // Password sin encriptar (hashar)

    usuarioPorCrear.password = await usuarioPorCrear.encriptarPassword(
      usuarioPorCrear.password
    );

    const usuarioCreado = await usuarioPorCrear.save();
    return usuarioCreado;
  } catch (error) {
    throw error;
  }
};

export default {
  UsuarioModelo,
  getByCorreo,
  createUser,
  getUserById,
  chequearPassword,
};
