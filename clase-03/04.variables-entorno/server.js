const app = require("./src/app")
require('dotenv').config()

const PORT = process.env.PORT

app.listen(PORT, (error) => {
  if (error) {
    throw new Error(`El servidor no está pudiendo arrancar ${error}`)
  }
  console.log(`El servidor arrancó en: http://localhost:${PORT}`)
})
