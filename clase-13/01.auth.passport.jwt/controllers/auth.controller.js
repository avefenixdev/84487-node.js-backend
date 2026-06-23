import passport from 'passport';
import authModel from '../models/auth.model.js';
import jwt from 'jsonwebtoken';

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

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const usuario = await authModel.getByCorreo(correo);

    const esCorrecto = await authModel.chequearPassword(usuario, password);

    if (!usuario || !esCorrecto) {
      return res.status(200).json({ mensaje: 'Credenciales inválidas' });
    }

    console.log('OK');

    // ! FIRMAR EL TOKEN (GENERAR TOKEN)
    const payload = { id: usuario._id };
    // https://www.jwt.io/
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' });
    console.log(token);
    res.cookie('jwt', token, {
      httpOnly: true, // No se pueda manipular desde js en el cliente
      secure: false, // Cuando este en producción a true (https)
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    res.json({ token: `Bearer ${token}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Algo falló' });
  }
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.json({ mensaje: 'Sesión cerrada' });
};

export default {
  register,
  login,
  logout,
};
