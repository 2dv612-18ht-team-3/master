const express = require('express')
const router = express.Router()
const Typemodel = require('../db_resources/typemodel.js')
// uncomment relevant lines to switch into post mode when frontend is ready.
router.post('/typedata', (req, res, next) => {
  const mongoose = require('mongoose')
  // you will need to have a PASS=mongoDBpassword environment variable to connect!
  mongoose.connect('mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3', { useNewUrlParser: true }, function (error) {
    if (error) {
      res.status(500).json({
        message: 'Unable to establish database connection'
      })
    }
    Typemodel.find((err, types) => {
      if (err) {
        mongoose.connection.close()
        res.status(500).json({
          message: 'unable to find any Customer Classes'
        })
      } else {
        mongoose.connection.close()
        res.status(200).send(types)
      }
    })
  })
})
// router.get('/', (req, res, next) => {
router.post('/', (req, res, next) => {
  // need to control the API access somehow, currently admin checks are only on frontend
  if (true) {
    // if(req.body.name === 'admin' && req.body.password === 'secret' && req.body.type) { // TODO DO NOT STORE PASSWORD AND USERNAME HERE
    const mongoose = require('mongoose')
    // you will need to have a PASS=mongoDBpassword environment variable to connect!
    mongoose.connect('mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3', { useNewUrlParser: true }, function (error) {
      if (error) {
        res.status(500).json({
          message: 'Unable to establish database connection'
        })
      }
      let input = req.body.cclass
      // let typedata=new typemodel({customerClass: req.body.type})
      let typedata = new Typemodel({ customerClass: input })
      Typemodel.find({ customerClass: input }).exec(function (err, docs) {
        if (err || docs.length !== 0) {
          mongoose.connection.close()
          res.status(400).json({
            message: 'Customer Class: ' + input + ' Already Exists'
          })
        } else {
          console.log(docs.length)

          typedata.save(function (err) {
            if (err) {
              mongoose.connection.close()
              res.status(500).json({
                message: 'unable to create database object'
              })
            } else {
              mongoose.connection.close()
              res.status(200).json({
                message: 'saved new Customer Class: ' + input
              })
            }
          })
        }
      })
    })
  } else {
    res.status(401).json({
      message: 'Unauthorized'
    })
  }
})

module.exports = router
