import express from 'express';
import bcrypt from 'bcrypt';
import UsuarioModelo from '../models/auth.model.js';
const routerAuth = express.Router();

// ! ---------------------- Rutas Usuarios

// ! Ruta donde recibo la info de logueo (correo, password)
routerAuth.post('/login', (req, res) => {
  res.send('login');
});
// ! Ruta donde recibo la info de register ( nombre, correo, password, confirm-password )
routerAuth.post('/register', async (req, res) => {
  try {
    // Para registrar un usuario
    // ! 1. recibir los datos -> nombre, correo, password, confirm_password
    console.log(req.body); // <-- acá dentro van a venir los datos
    const { nombre, correo, password, confirm_password } = req.body;
    // ! 2. Controlar si el correo existe en la DB
    const usuario = await UsuarioModelo.findOne({ correo });
    console.log(usuario);

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

    const usuarioPorCrear = new UsuarioModelo({ nombre, correo, password }); // Password sin encriptar (hashar)
    // Tenemos diferentes tipos de algoritmos de hasheo (encriptación)
    // Simple vía -> Una vez hasheado, no se puede recuperar el valor original -> 123456 -> Nunca más voy a ver ese valor -> (bcrypt)
    // Doble vía -> Un vez hasheado, puedo deshashar y recuperar el valor original.
    const salt = await bcrypt.genSalt(10); // Semilla ( SaltRound -> Factor de Coste ) A Mayor valor, más tiempo y costo de procesamiento para generar la semilla
    usuarioPorCrear.password = await bcrypt.hash(password, salt);

    const usuarioCreado = await usuarioPorCrear.save();
    console.log(usuarioCreado);

    // ! 5. Respuesta con OK
    res.status(201).json({
      msg: 'Todo salió bien, se creo el usuario',
      usuario: { ok: true, usuario: usuarioCreado },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'No se pudo registrar el usuario' });
  }
});
// ! Ruta deslogueo de usuario
routerAuth.get('/logout', (req, res) => {
  res.send('logout');
});

export default routerAuth; // funcionalidad principal de este módulo
