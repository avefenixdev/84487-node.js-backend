import { Strategy } from 'passport-local';
import authModel from '../models/auth.model.js';
import passport from 'passport';

const fieldEstrategia = { usernameField: 'correo' };

const comprobarUsuario = async (correo, password, done) => {
  try {
    // ! 1. Busco el usuario en la DB
    const usuario = await authModel.getByCorreo(correo); // usuario o nulo

    if (!usuario) {
      return done(null, false, { message: 'Usuario no se encontró' });
    }

    // ! 2. Comprobar si el password que recibí del formulario de login coincide con el password almacenado
    // true si es correcto, devuelve false si no es correcto
    // usuario encontrado basado en el correo y password recibido desde el formulario de login
    const esCorrecto = await authModel.chequearPassword(usuario, password);
    // el usuario (Encontrar por getByCorreo) y el password que viene del form de login

    if (!esCorrecto) {
      // done es una función -> 3 argumentos -> error, salio-todo-bien, info-adicional) si salió todo bien o no. Mensaje opcional. 2do argumento el usuario obtenido en el punto 1.
      return done(null, false, { message: 'No coincide el password' });
    }

    // ! 3. El usuario existe y se coloco contraseña correcta.
    return done(null, usuario);
  } catch (error) {
    console.log('Comprobando de usuario fallida', error);
    return done(error);
  }
};

// Strategy(<field>, callback)
const estrategiaLocal = new Strategy(fieldEstrategia, comprobarUsuario);

export default passport.use(estrategiaLocal);

// Ejecutarse una sola vez después dle login. No guardo el usuario enterio en la cookie. guardo solo el id
passport.serializeUser((usuario, done) => {
  done(null, usuario.id); // Guardo el id en la cookie del cliente (Guarda el id)
});

// Passport recupera el id de la cookie
// busca el usuario en la db
// lo deja disponible en el req.user
passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await authModel.getUserById(id);
    done(null, usuario);
  } catch (error) {
    done(error);
  }
}); // esta función inyecta en el objeto req el usuario autenticado (req.user)
