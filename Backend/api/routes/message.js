const express = require('express')
const router = express.Router()
const Messagemodel = require('../db_resources/messagemodel.js')

/**
 * Get the admin message.
 */
router.get('/', (req, res, next) => {
  const mongoose = require('mongoose')

  mongoose.connect('mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3', { useNewUrlParser: true }, function (error) {
    if (error) {
      res.status(500).json({
        message: 'Unable to establish database connection'
      })
    }

    Messagemodel.findOne({stringId: 'admin_message'}, function (err, result) {
      if (err) {
        console.log(err)
      } else {
        res.status(200).json(result)
      }
    })
  })
})

/**
 * Set a new message. Empties `viewed_by` array.
 */
router.post('/', (req, res, next) => {
  const mongoose = require('mongoose')

  mongoose.connect('mongodb+srv://team3:' + process.env.PASS + '@cluster0-xwlga.mongodb.net/team3', { useNewUrlParser: true }, function (error) {
    if (error) {
      res.status(500).json({
        message: 'Unable to establish database connection'
      })
    }
    // Updates the message in database, creates if not exists
    let query = {stringId: "admin_message"}
    let update = { message: req.body.message, viewed_by: [], stringId: 'admin_message' }
    let options = { upsert: true, new: true, setDefaultsOnInsert: true }

    Messagemodel.findOneAndUpdate(query, update, options, function (err, response) {
      if (err) {
        console.log(err)
      } else {
        //console.log('Success')
        mongoose.connection.close()
        next()
      }
    })
  })
})

/**
 * Updates `viewed_by` array.
 */
router.patch('/', (req, res, next) => {})

module.exports = router