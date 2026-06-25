import express from 'express';
const routerAuth = express.Router();
import authController from '../controllers/auth.controller.js';

// ! ---------------------- Rutas Usuarios

// ! Ruta donde recibo la info de logueo (correo, password)
routerAuth.post('/login', authController.login);

// ! Ruta donde recibo la info de register ( nombre, correo, password, confirm-password )
routerAuth.post('/register', authController.register);

// ! Ruta deslogueo de usuario
routerAuth.get('/logout', authController.logout);

export default routerAuth; // funcionalidad principal de este módulo
