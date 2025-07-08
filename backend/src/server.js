const express = require('express')
const libraryRouter = require('./routes/library.router')

const app = express()
app.use(express.json())


app.use('/api/library', libraryRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})