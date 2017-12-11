const express = require('express'),
      nodemailer = require('nodemailer'),
      Visitor = require('../models/visitor')
    
require('dotenv').config()

module.exports = (() => {
  'use strict';

  const router = express.Router();

  router.post('/add', (req, res) => {
    var newInfo = {
      name: req.body.name,
      email: req.body.email,
      telephone: req.body.telephone,      
      company: req.body.company,
      official: (req.body.official === 'True'),
      escort: (req.body.escort === 'True'),
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
        // WARNING: Must enable access to less-secure applications in gmail account 
        // for this to work properly
        // const transporter = nodemailer.createTransport({
        //   service: 'Gmail',
        //   auth: {
        //     user: process.env.SOURCE_EMAIL,
        //     pass: process.env.SOURCE_PASSWORD,
        //   }
        // });
        // const options = {
        //   from: process.env.SOURCE_EMAIL,
        //   to: process.env.DESTINATION_EMAIL,
        //   subject: 'A New Visitor Has Checked In!',
        //   text: `${newInfo.name} has justed checked in!` 
        // }
        // transporter.sendMail(options, (error, info) => {
        //   if (error) {
        //     console.log('EMAIL-ERROR', error)
        //   } else {
        //     console.log('EMAIL SEND SUCCESSFULLY!'); 
        //   }
        // })
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
        res.send(docs)
      }
    })
  })
  
  return router
})();