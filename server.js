const express = require('express'),
      cors = require('cors'),
      path = require('path'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      visitor = require('./server/routes/visitor')


mongoose.connect('mongodb://admin:admin@ds119064.mlab.com:19064/hugos_first_app_73726');

let app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, './dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/visitor', visitor)

app.use(function(err, req, res, next) {
  console.log(error)
})

const port =  3000;
app.listen(port, () => console.log('Running on localhost:', port))