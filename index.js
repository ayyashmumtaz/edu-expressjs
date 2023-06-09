const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//import route posts
const kerjaanRouter = require('./routes/pekerjaan');
const indoorRouter = require('./routes/data_indoor');

//route posts
app.use('/api/data_indoor', indoorRouter); // use route posts di Express
app.use('/api/pekerjaan', kerjaanRouter); // use route posts di Express


app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`)
})