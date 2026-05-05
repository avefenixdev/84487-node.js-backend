const app = require("./src/app")
const PORT = 8080

app.listen(PORT, (error) => {
  if (error) {
    throw new Error(`El servidor no está pudiendo arrancar ${error}`)
  }
  console.log(`El servidor arrancó en: http://localhost:${PORT}`)
})
