const mongoose = require('mongoose');

const handleConnect = async (mongosc) => {

  try {
    console.time()
    const data = await mongoose.connect(mongosc)
    console.log('Conectado correctamente...')
    console.timeEnd()
  } catch (error) {
    console.log('No se pudo conectar', error)
  }

}

const handleConnectThenCatch = (mongosc) => {

  mongoose.connect(mongosc)
    .then((data) => {
      console.log('Conectado')
      //console.log('Conectado', data)
    })
    .catch(err => {
      console.log('No se pudo conectar', err)
    })

}

module.exports = handleConnect