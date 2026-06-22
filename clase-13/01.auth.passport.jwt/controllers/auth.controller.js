import passport from 'passport';
import authModel from '../models/auth.model.js';

const register = async (req, res) => {
  try {
    // Para registrar un usuario
    // ! 1. recibir los datos -> nombre, correo, password, confirm_password
    console.log(req.body); // <-- acá dentro van a venir los datos
    const { nombre, correo, password, confirm_password } = req.body;
    // ! 2. Controlar si el correo existe en la DB

    const usuario = await authModel.getByCorreo(correo);

    if (usuario) {
      return res
        .status(200)
        .json({ msg: 'El usuario existe dentro de nuestros registro' });
    }

    // ! 3. Controlar si los password coincides ( password === confirm_password )
    if (password !== confirm_password) {
      return res.status(400).json({ msg: 'Las contraseñas no coinciden' });
    }

    // ! 4. Guardar el usuario en una colección dentro de Mongo

    const usuarioCreado = await authModel.createUser(nombre, correo, password);

    // ! 5. Respuesta con OK
    res.status(201).json({
      msg: 'Todo salió bien, se creo el usuario',
      usuario: { ok: true, usuario: usuarioCreado },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'No se pudo registrar el usuario' });
  }
};

const login = passport.authenticate('local', {
  successRedirect: '/productos', // esCorrecto -> true
  failureRedirect: '/', // esCorrecto -> false
});

const logout = (req, res) => {
  res.send('logout');
};

export default {
  register,
  login,
  logout,
};
