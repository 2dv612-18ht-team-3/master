const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Messagemodel = require('../db_resources/messagemodel.js')

router.get('/', (req, res, next) => {
  mongoose.connect('mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3', { useNewUrlParser: true }, function (error) {
    if (error) {
      res.status(500).json({
        message: 'Unable to establish database connection'
      })
    } else {
      Messagemodel.find({ stringId: 'admin_message' }, function (err, result) {
        if (err) {
          console.log(err)
        } else {
          
          res.status(200).send(result)
        }

      // console.log(result)
      })
    }
  })
})

router.post('/', (req, res, next) => {
  const mongoose = require('mongoose')
  // you will need to have a PASS=mongoDBpassword environment variable to connect!
  mongoose.connect('mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3', { useNewUrlParser: true }, function (error) {
    if (error) {
      res.status(500).json({
        message: 'Unable to establish database connection'
      })
    }
    // Updates the message in database, creates if not exists
    let query = {stringId: "admin_message"}
    let update = { messages: { message: req.body.message, viewed_by: [], stringId: 'admin_message' } }
    let options = { upsert: true, new: true, setDefaultsOnInsert: true }

    Messagemodel.update(query, {$push: update}, options, function (err, res) {
      if (err) {
        console.log(err)
      } else {
        console.log(res)
      }
    })
  })
})

router.post('/viewed', (req, res, next) => {
  const mongoose = require('mongoose')
  // you will need to have a PASS=mongoDBpassword environment variable to connect!
  mongoose.connect('mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3', { useNewUrlParser: true }, function (error) {
    if (error) {
      res.status(500).json({
        message: 'Unable to establish database connection'
      })
    }

//    console.log(req.body)

    Messagemodel.find({ stringId: 'admin_message' }, function (err, result) {
      if (err) {
        console.log(err)
      }
      // res.status(200).send(result)
let emailArray
 result[0].messages.forEach(function(item){

if(item.message===req.body.message){
emailArray =item.viewed_by
emailArray.push(req.body.email)
}
})

//will overwrite entire message set in current implementation, need to fix database model
      let query = { stringId: 'admin_message'}
      let update = {messages:{ message: req.body.message, viewed_by: emailArray, stringId: 'admin_message' }}
      let options = { upsert: true, new: true, setDefaultsOnInsert: true }

      Messagemodel.update(query, {$set: update}, options, function (err, res) {
        if (err) {
          console.log(err)
        } else {
          console.log(res)
        }
      })
    })
  })
})

module.exports = router
