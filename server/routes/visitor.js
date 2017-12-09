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
        res.status(400).json({result: "NO"}).send()
      }
      else {
        console.log('User created successfully!')
        res.status(200).json({result: "OK"}).send()
      }
    })  
  })

  router.get('/get/:offset/:max', (req, res) => {
    const offset = parseInt(req.params.offset)
    const max = parseInt(req.params.max)

    const skip = offset * max
    const limit = max
    
    Visitor.find({}, '', {skip: skip, limit: limit}, (err, docs) => {
      if (err){
        console.log("ERROR", err)
        res.status(400).send()
      } else {
        console.log("RECORDS", docs)
        res.status(200).json(docs).send()
      }
    })
  })
  
  return router
})();