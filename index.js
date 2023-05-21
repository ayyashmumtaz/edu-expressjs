const express = require('express')
const app = express()
const port = 3000

//import route posts
const kerjaanRouter = require('./routes/data_outdoor');
app.use('/api/pekerjaan', kerjaanRouter); // use route posts di Express

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})