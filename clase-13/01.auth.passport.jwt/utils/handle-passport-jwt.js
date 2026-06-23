import passport from 'passport';
import { Strategy } from 'passport-jwt';
import authModel from '../models/auth.model.js';

// Funcionalidad para extraer el token de la cookie
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }
  return token;
};

const opciones = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET,
};

const comprobarUsuario = async (jwt_payload, done) => {
  try {
    // ! 1. Busco el usuario en la DB
    const usuario = await authModel.getUserById(jwt_payload.id);
    // ! 2. Verifico el usuario existo
    if (usuario) {
      return done(null, usuario);
    }
    // ! 2.1 Si el usuario no existe
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

const estrategiaJWT = new Strategy(opciones, comprobarUsuario);
export default passport.use(estrategiaJWT);
