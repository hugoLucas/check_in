const express = require('express'),
      nodemailer = require('nodemailer'),
      Admin = require('../models/admin'),
      bcrypt = require('bcryptjs')

require('dotenv').config()

module.exports = (() => {
  'use strict';

  const router = express.Router();

  router.post('/add', (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      if (err) {
        console.log('ENCRYPTION ERROR', err)
        res.status.send(400)
      } else {
        const newAdmin = {
          username: req.body.username,
          password: hash, 
        }
        Admin.create(newAdmin, (err) => {
          if (err) {
            console.log('MONGO ERROR', err)
            res.status(400).send()
          } else {
            res.status(200).send()
          }
        })
      }
    })
  })

  router.post('/login', (req, res) => {
    Admin.findOne({username: req.body.username}, (err, doc) => {
      if (err) {
        console.log("AUTH ERROR", err)
        res.status(220).send()
      } else {
        if (doc) {
          bcrypt.compare(req.body.password, doc.password, (err, success) => {
            if (err) {
              console.log('DECRYPTION ERROR', err)
              res.status.send(220)
            }
            if (success) {
              console.log(success)
              res.status(200).send()
            } else {
              res.status(220).send()
            }
          }) 
        } else {
          console.log('NO USER BY THAT NAME')
          res.status(220).send()
        }
      }
    })
  })

  return router
})();