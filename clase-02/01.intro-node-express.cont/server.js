const express = require('express')
const app = express()
const PORT = 8080

// callback -> anonima
app.get('/', (req, res) => { 
    res.send('Hola mundo!') 
})

app.listen(PORT, () => {
  console.log(`El servidor arrancó en: http://localhost:${PORT}`)
})

