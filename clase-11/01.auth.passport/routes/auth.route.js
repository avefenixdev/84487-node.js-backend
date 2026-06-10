import express from 'express';
const routerAuth = express.Router();

// ! ---------------------- Rutas Usuarios

// ! Ruta donde recibo la info de logueo (correo, password)
routerAuth.post('/login', (req, res) => {
  res.send('login');
});
// ! Ruta donde recibo la info de register ( nombre, correo, password, confirm-password )
routerAuth.post('/register', (req, res) => {
  res.send('register');
});
// ! Ruta deslogueo de usuario
routerAuth.get('/logout', (req, res) => {
  res.send('logout');
});

export default routerAuth; // funcionalidad principal de este módulo
