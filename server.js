const express = require('express'),
      cors = require('cors'),
      path = require('path'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      visitor = require('./server/routes/visitor'),
      admin = require('./server/routes/admin')

require('dotenv').config();
console.log(process.env.MONGO_URI);

mongoose.Promise = global.Promise; 
mongoose.connect(process.env.MONGO_URI);

let app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, './dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/visitor', visitor)
app.use('/admin', admin)

app.use(function(err, req, res, next) {
  console.log(err)
})

const port =  3000;
app.listen(port, () => console.log('Running on localhost:', port))