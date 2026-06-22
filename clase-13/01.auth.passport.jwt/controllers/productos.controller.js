const getAllProductos = (req, res) => {
  res.send('Todos los productos');
};

const getOneProductos = (req, res) => {
  res.send('Un solo producto');
};

export default {
  getAllProductos,
  getOneProductos,
};
