const express = require('express')
const cors = require('cors');  
const libraryRouter = require('./routes/library.router')

const app = express()
app.use(cors()); 
app.use(express.json())


app.use('/api/library', libraryRouter)

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }

module.exports = app