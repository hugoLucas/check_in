const express = require('express'),
      Visitor = require('../models/visitor')

module.exports = (() => {
  'use strict';

  const router = express.Router();

  router.post('/add', (req, res) => {
    var newInfo = {
      name: req.body.name,
      email: req.body.email,
      telephone: req.body.telephone,      
      company: req.body.company,
      official: req.body.official,
      escort: req.body.escort,
      escortName: req.body.escortName,
      date: new Date,
    }
    console.log(newInfo)
    Visitor.create(newInfo, (err) => {
      if (err) {
        console.log('Error detected: ', err)
        res.status(400).send()
      }
      else {
        console.log('User created successfully!')
        res.status(200).send()
      }
    })  
  })
  
  return router
})();